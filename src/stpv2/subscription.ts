import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import {
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
  encodeFunctionData,
  getContract,
  parseEventLogs,
  zeroAddress,
} from 'viem';
import {
  getBalance,
  getClient,
  readContract,
  readContracts,
  simulateContract,
} from '@wagmi/core';
import { stpv2Abi as abi } from '../generated.js';
import { wagmiConfig } from '../config/index.js';
import { ApprovedTokens } from '../erc20/index.js';
import {
  type ContractRequest,
  type SubscriberRequest,
  type PayableContractRequest,
} from '../stp/common.js';
import { range, writePreparedAndFetchReceipt } from '../utils.js';
import { loadContract as loadERC20 } from '../erc20/index.js';

export type ContractDetail = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'contractDetail'>['outputs']
>[0];

export type SubscriberDetail = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'subscriptionOf'>['outputs']
>[0];

export type TierState = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'tierDetail'>['outputs']
>[0];

export type Tier = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'createTier'>['inputs']
>[0];

export type CurveDetail = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'curveDetail'>['outputs']
>[0];

export type FeeDetail = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'feeDetail'>['outputs']
>[0];

export enum Role {
  MANAGER = 1,
  AGENT = 2,
}

export type ContractState = ContractDetail & {
  name: string;
  symbol: string;
  contractURI: string;
  owner: `0x${string}`;
  pendingOwner: `0x${string}`;
  fees: FeeDetail;
  tier1: TierState;
  curve0: CurveDetail;
  subscriber: SubscriberDetail;
};

export type SubscriberContext = ContractState & {
  holdings: ApprovedTokens;
};

export type MintRequest = ContractRequest & {
  erc20?: boolean;
  referralCode?: bigint;
  referrer?: `0x${string}`;
  tierId?: number;
  recipient: `0x${string}`;
  amount: bigint;
};

async function fetchCurrencyAddress({
  contractAddress,
  chainId,
}: ContractRequest): Promise<`0x${string}`> {
  return readContract(wagmiConfig(), {
    abi,
    address: contractAddress,
    functionName: 'contractDetail',
    chainId,
  }).then((result) => result.currency);
}

function loadContract({ chainId, contractAddress }: ContractRequest) {
  const client = getClient(wagmiConfig(), { chainId })!;
  return getContract({
    address: contractAddress,
    abi,
    client,
  });
}

//////////////////////
/// Read Functions ///
//////////////////////

/**
 * Fetch the subscriber state
 * @param request request for subscription details for a given account
 * @returns The subscription, if tokenId = 0, the account has no subscription
 */
export async function subscriptionOf({
  contractAddress,
  chainId,
  account,
}: SubscriberRequest): Promise<SubscriberDetail> {
  return loadContract({ chainId, contractAddress }).read.subscriptionOf([
    account,
  ]);
}

/**
 * @returns The remaining time balance of an account
 */
export async function balanceOf({
  contractAddress,
  chainId,
  account,
}: SubscriberRequest): Promise<bigint> {
  return loadContract({ chainId, contractAddress }).read.balanceOf([account]);
}

/**
 * @returns The remaining time balance of an account on a particular tier (0 if they are on any other tier)
 */
export async function tierBalanceOf({
  contractAddress,
  chainId,
  account,
  tierId,
}: SubscriberRequest & { tierId: number }): Promise<bigint> {
  return loadContract({ chainId, contractAddress }).read.tierBalanceOf([
    tierId,
    account,
  ]);
}

/**
 * @returns The tier details for a given tier id
 */
export async function tierDetail({
  contractAddress,
  chainId,
  tierId,
}: ContractRequest & { tierId: number }): Promise<TierState> {
  return loadContract({ chainId, contractAddress }).read.tierDetail([tierId]);
}

/**
 * @returns The tier details for a set of tier ids
 */
export async function multiTierDetail({
  contractAddress,
  chainId,
  tierIds,
}: ContractRequest & { tierIds: number[] }): Promise<TierState[]> {
  const contract = loadContract({ chainId, contractAddress });
  return Promise.all(
    tierIds.map((tierId) => contract.read.tierDetail([tierId])),
  );
}

/**
 * @returns The reward curve details for a given id
 */
export async function curveDetail(
  request: ContractRequest & { curveId: number },
): Promise<CurveDetail> {
  return loadContract(request).read.curveDetail([request.curveId]);
}

/**
 * @returns The reward curve details for a set of curve ids
 */
export async function multiCurveDetail({
  contractAddress,
  chainId,
  curveIds,
}: ContractRequest & { curveIds: number[] }): Promise<CurveDetail[]> {
  const contract = loadContract({ chainId, contractAddress });
  return Promise.all(
    curveIds.map((curveId) => contract.read.curveDetail([curveId])),
  );
}

/**
 * @returns The referral detail for a given code
 */
export async function referralDetail({
  contractAddress,
  chainId,
  code,
}: ContractRequest & { code: bigint }) {
  return loadContract({ chainId, contractAddress }).read.referralDetail([code]);
}

/**
 * Fetch the contract state
 * @param request request for contract details
 * @returns The contract details
 */
export async function fetchState({
  contractAddress,
  chainId,
  account,
}: ContractRequest & { account?: `0x${string}` }): Promise<ContractState> {
  const contract = loadContract({ chainId, contractAddress });

  const [
    name,
    symbol,
    contractURI,
    owner,
    pendingOwner,
    detail,
    fees,
    tier1,
    curve0,
    subscriber,
  ] = await Promise.all([
    contract.read.name(),
    contract.read.symbol(),
    contract.read.contractURI(),
    contract.read.owner(),
    contract.read.pendingOwner(),
    contract.read.contractDetail(),
    contract.read.feeDetail(),
    contract.read.tierDetail([1]),
    contract.read.curveDetail([0]),
    contract.read.subscriptionOf([account || zeroAddress]),
  ]);

  const result: ContractState = {
    ...detail,
    fees,
    name,
    symbol,
    contractURI,
    owner,
    pendingOwner,
    tier1,
    curve0,
    subscriber,
  };

  return result;
}

/**
 * Fetch the contract state + subscriber holdings
 * @param request request for contract details
 * @returns The contract details
 */
export async function fetchContext({
  contractAddress,
  chainId,
  account,
}: ContractRequest & { account?: `0x${string}` }): Promise<SubscriberContext> {
  const state = await fetchState({ contractAddress, chainId, account });

  const holdings: ApprovedTokens = {
    balance: 0n,
    approved: 0n,
  };

  // TODO: This can be optimized...
  if (account && account !== zeroAddress) {
    if (state.currency !== zeroAddress) {
      const erc20 = loadERC20({ chainId, contractAddress: state.currency });
      const [balance, approved] = await Promise.all([
        erc20.read.balanceOf([account]),
        erc20.read.allowance([account, contractAddress]),
      ]);
      holdings.balance = balance;
      holdings.approved = approved;
    } else {
      holdings.balance = holdings.approved = (
        await getBalance(wagmiConfig(), { chainId, address: account })
      ).value;
    }
  }

  return {
    ...state,
    holdings,
  };
}

// Constrained multi-call
async function multiRead<
  functionName extends ContractFunctionName<typeof abi, 'view'>,
  args extends ContractFunctionArgs<typeof abi, 'view', functionName>,
>({
  contractAddress,
  chainId,
  functionName,
  argsets,
}: ContractRequest & { functionName: functionName; argsets: args[] }) {
  const contracts = argsets.map((args) => {
    return {
      address: contractAddress,
      chainId,
      abi,
      functionName,
      args,
    };
  });

  return readContracts(wagmiConfig(), {
    // @ts-ignore todo: bound types correctly
    contracts,
  }).then((c) => c.map((r) => r.result));
}

/**
 * Fetch the token owners for a given range
 * @param request request for token owners
 * @returns The token owner accounts (0x0 indicates no owner)
 */
export async function fetchTokenOwners({
  contractAddress,
  chainId,
  fromTokenId,
  toTokenId,
}: ContractRequest & { fromTokenId?: bigint; toTokenId: bigint }): Promise<
  `0x${string}`[]
> {
  const argsets: [bigint][] = range(fromTokenId || 1n, toTokenId).map(
    (tokenId: bigint) => [tokenId],
  );
  return multiRead({
    contractAddress,
    chainId,
    functionName: 'ownerOf',
    argsets,
  }).then((owners) => owners.map((o) => o as `0x${string}`));
}

/**
 * Fetch the subscribers for a given set of accounts
 * @returns The subscriber details for the given accounts
 */
export async function fetchSubscribers({
  contractAddress,
  chainId,
  accounts,
}: ContractRequest & { accounts: `0x${string}`[] }): Promise<
  (SubscriberDetail & { account: `0x${string}` })[]
> {
  const argsets: [`0x${string}`][] = accounts.map((a) => [a]);
  return multiRead({
    contractAddress,
    chainId,
    argsets,
    functionName: 'subscriptionOf',
  }).then((subs) =>
    subs.map((sub, i) => ({
      ...(sub as SubscriberDetail),
      account: accounts[i],
    })),
  );
}

////////////////////
/// Transactions ///
////////////////////

/**
 * @description Prepares a transaction to create a new referral code
 * @param request The request to create a referral code
 * @returns A function which will execute a prepared transaction to transfer ownership
 * @throws If the transaction cannot be prepared
 */
export async function prepareCreateReferralCode(
  request: ContractRequest & {
    referralCode: bigint;
    bps: number;
    permanent?: boolean;
    referrer?: `0x${string}`;
  },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'setReferralCode',
    args: [
      request.referralCode,
      request.bps,
      request.permanent || false,
      request.referrer || zeroAddress,
    ],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to remove an existing referral code
 * @param request The request to delete a referral code
 * @returns A function which will execute a prepared transaction to transfer ownership
 * @throws If the transaction cannot be prepared
 */
export async function prepareDeleteReferralCode(
  request: ContractRequest & { referralCode: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  return prepareCreateReferralCode({
    ...request,
    bps: 0,
  });
}

/**
 * @description Create a new reward curve
 * @param request The curve params
 * @returns A function which will execute a prepared transaction to transfer ownership
 * @throws If the transaction cannot be prepared
 */
export async function prepareCreateRewardCurve(
  request: ContractRequest & { curve: CurveDetail },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'createRewardCurve',
    args: [request.curve],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Find a curve id from the transaction receipt
 * @param receipt transaction receipt from the curve creation
 * @returns A an id of the created curve
 */
export function extractCreatedCurveId(
  receipt: TransactionReceipt,
): number | undefined {
  const logs = parseEventLogs({
    abi,
    eventName: ['CurveCreated'],
    logs: receipt.logs,
  });
  return logs[0]?.args?.curveId;
}

/**
 * @description Prepares a transaction to create a new reward curve
 * @param request the request to configure the curve
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareCreateTier(
  request: ContractRequest & { tier: Tier },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'createTier',
    args: [request.tier],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Find a tier id from the transaction receipt
 * @param receipt transaction receipt from the tier creation
 * @returns A an id of the created tier
 */
export function extractCreatedTierId(
  receipt: TransactionReceipt,
): number | undefined {
  const logs = parseEventLogs({
    abi,
    eventName: ['TierCreated'],
    logs: receipt.logs,
  });
  return logs[0]?.args?.tierId;
}

/**
 * @description Prepares a transaction to update a given tier
 * @param request the request with tier params
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 * @remarks This will update the tier with the given id and overwrite the existing tier params
 */
export async function prepareUpdateTier(
  request: ContractRequest & { tier: Tier; tierId: number },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'updateTier',
    args: [request.tierId, request.tier],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to set the roles for a given account
 * @param request the request with bitmask for roles
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 * @remarks Setting roles to [] will revoke all roles for the account
 */
export async function prepareSetRoles(
  request: ContractRequest & { account: `0x${string}`; roles: Role[] },
): Promise<() => Promise<TransactionReceipt>> {
  let flags = 0;
  for (const role of request.roles) {
    flags |= role;
  }

  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'setRoles',
    args: [request.account, flags],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to issue reward shares to an account
 * @param request the request to issue shares
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareIssueShares(
  request: ContractRequest & { account: `0x${string}`; shares: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'issueRewardShares',
    args: [request.account, request.shares],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to yield rewards to reward holders
 * @param request the request to yield rewards
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareYieldRewards(
  request: PayableContractRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'yieldRewards',
    args: [request.value],
    chainId: request.chainId,
    value: request.erc20 ? 0n : request.value,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to transfer rewards to a given account
 * @param request the request to transfer rewards
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareTransferRewards(
  request: ContractRequest & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'transferRewardsFor',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to top-up the creator balance, so refunds can happen post transfer
 * @param request payable request
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareTopUp(
  request: PayableContractRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'topUp',
    args: [request.value],
    chainId: request.chainId,
    value: request.erc20 ? 0n : request.value,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to refund a given account (removing purchased time in exchange for tokens)
 * @param request the request for refund
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareRefund(
  request: ContractRequest & { account: `0x${string}`; amount: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'refund',
    args: [request.account, request.amount],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to deactivate a subscription
 * @param request the request to deactivate a subscription
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 * @remarks This will deactivate the subscription removing them from a tier
 */
export async function prepareDeactivation(
  request: SubscriberRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'deactivateSubscription',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a grant time transaction for the given Subscription NFT.
 * @param request A request to grant time to an account
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareGrantTime(
  request: SubscriberRequest & { numSeconds: number; tierId: number },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'grantTime',
    args: [request.account, request.numSeconds, request.tierId],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a reoke time transaction for the given Subscription NFT.
 * @param request A request to revoke time of an account
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareRevokeGrantedTime(
  request: SubscriberRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'revokeTime',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction for the connected account and given Subscription NFT.
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareMint(
  request: ContractRequest & { amount: bigint; erc20?: boolean },
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchCurrencyAddress(request)) !== zeroAddress;
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'mint',
    args: [request.amount],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction with advanced parameters (referral, tier, recipient)
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareMintAdvanced(
  request: MintRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchCurrencyAddress(request)) !== zeroAddress;

  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'mintAdvanced',
    args: [
      {
        purchaseValue: request.amount,
        referralCode: request.referralCode || 0n,
        referrer: request.referrer || zeroAddress,
        tierId: request.tierId || 0,
        recipient: request.recipient,
      },
    ],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares an update metadata transaction for the given Subscription NFT.
 * @param request A request to update the metadata of a subscription NFT
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareUpdateMetadata(
  request: ContractRequest & { contractUri: string },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'updateMetadata',
    args: [request.contractUri],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transfer ownership transaction for the given Subscription NFT.
 * @param request A request to transfer ownership
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareTransferOwnership(
  request: ContractRequest & { newOwner: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'setPendingOwner',
    args: [request.newOwner],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to set the contract level supply cap. 0 for unlimited.
 * @param request the request to set the supply cap
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareSetSupplyCap(
  request: ContractRequest & { supplyCap: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'setGlobalSupplyCap',
    args: [request.supplyCap],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to set the transfer recipient. This allows automated balance transfers to
 * another address, via sponsored calls.
 * @param request the request to set the transfer recipient
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareSetTransferRecipient(
  request: ContractRequest & { recipient: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'setTransferRecipient',
    args: [request.recipient],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to transfer creator funds
 * @param request the request to transfer funds
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareTransferFunds(
  request: ContractRequest & { to: `0x${string}`; amount: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'transferFunds',
    args: [request.to, request.amount],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to slash rewards for an account that has lapsed, if slashing is possible
 * @param request the request to slash rewards
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareSlashRewards(
  request: ContractRequest & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'slash',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to accept ownership of the contract
 * @param request the request to accept ownership
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareAcceptOwnership(
  request: ContractRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'acceptOwnership',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a multicall transaction to batch nonpayable calls
 * @param request the request with calls for each action to batch
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareMulticall<
  functionName extends ContractFunctionName<typeof abi, 'nonpayable'>,
  args extends ContractFunctionArgs<typeof abi, 'nonpayable', functionName>,
>(
  request: ContractRequest & {
    calls: { functionName: functionName; args: args }[];
  },
): Promise<() => Promise<TransactionReceipt>> {
  const calls = request.calls.map((call) =>
    encodeFunctionData({
      abi,
      functionName: call.functionName,
      args: call.args,
    } as any),
  );

  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'multicall',
    args: [calls],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to recover currency from the contract
 * @param request the request for recovery
 * @returns A function which will execute the prepared transaction
 * @throws If the transaction cannot be prepared
 */
export async function prepareRecoverCurrency(
  request: ContractRequest & {
    tokenAddress: `0x${string}`;
    recipientAddress: `0x${string}`;
    tokenAmount: bigint;
  },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi,
    address: request.contractAddress,
    functionName: 'recoverCurrency',
    args: [request.tokenAddress, request.recipientAddress, request.tokenAmount],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/////////////////////////
/// Utility Functions ///
/////////////////////////

/**
 * @description Checks if a token approval is required for the given amount of tokens
 * @param context The context to check the approval for
 * @param numTokens The number of tokens to check the approval for
 * @returns True if an approval is required, false otherwise
 */
export function isTokenApprovalRequired(
  context: SubscriberContext,
  numTokens: bigint,
): boolean {
  if (context.currency === zeroAddress) {
    return false;
  }
  return numTokens > context.holdings.approved;
}
