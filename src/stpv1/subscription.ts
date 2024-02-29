import { fetchBalance, readContract } from '@wagmi/core';
import { TransactionReceipt, zeroAddress } from 'viem';
import {
  prepareWriteSubscriptionTokenV1,
  subscriptionTokenV1ABI as abi,
} from '../generated.js';
import {
  writePreparedAndFetchReceipt,
  mapMulticall,
  TMappingMulticall,
} from '../utils.js';
import { ApprovedTokens } from '../erc20/index.js';
import { prepareHoldingsMulticall } from '../erc20/index.js';

export type CollectionRequest = {
  /** The contract address of the campaign */
  contractAddress: `0x${string}`;
  /** Optional chain id (otherwise the connected chain) */
  chainId?: number;
};

export type OwnershipTransferRequest = CollectionRequest & {
  /** The new owner address */
  newOwner: `0x${string}`;
};

export type SubscriberRequest = CollectionRequest & {
  /** The account address */
  account: `0x${string}`;
};

export type PurchaseRequest = CollectionRequest & {
  /** The amount of tokens to contribute */
  amount: bigint;
  erc20?: boolean;
};

export type GrantRequest = CollectionRequest & {
  /** The amount of seconds to grant to each account */
  numSeconds: bigint;
  /** The accounts to grant time to */
  accounts: `0x${string}`[];
};

export type RefundRequest = CollectionRequest & {
  /** The accounts to refund */
  accounts: `0x${string}`[];
  /** Credit value */
  credit?: bigint;
  /** ERC20 flag */
  erc20?: boolean;
};

export type MetadataUpdateRequest = CollectionRequest & {
  /** The contract level metadata data URI */
  contractUri: string;
  /** The token URI */
  tokenUri: string;
};

export type RecoverERC20Request = CollectionRequest & {
  /** The address of the ERC-20 token */
  erc20Address: `0x${string}`;
  /** The amount of ERC-20 tokens to recover */
  amount: bigint;
  /** The address to send the recovered tokens to */
  recipient: `0x${string}`;
};

export type SubscriberState = {
  /** The address of the account */
  address: `0x${string}`;
  /** The token id */
  tokenId: bigint;
  /** The amount of seconds the account can refund */
  refundableSeconds: bigint;
  /** The amount of seconds the account has purchased */
  secondsPurchased: bigint;
  /** The amount of tokens the account can withdraw from rewards */
  rewardBalance: bigint;
  /** The amount of reward points the account has */
  rewardPoints: bigint;
  /** Expires at */
  expiresAt: Date;
};

export type CollectionState = {
  /** The address of the NFT */
  address: `0x${string}`;
  /** Can accounts contribute */
  isPaused: boolean;
  /** The name of the NFT */
  name: string;
  /** The symbol of the NFT */
  symbol: string;
  /** The contract metadata URI */
  contractURI: string;
  /** The token metadata URI */
  tokenUri: string;
  /** The number of tokens (wei) which buys one second of time */
  tokensPerSecond: bigint;
  /** Minimum purchase in seconds */
  minimumPurchaseSeconds: bigint;
  /** Owner address */
  ownerAddress: `0x${string}`;
  /** The address of the ERC-20 token used for the campaign */
  erc20Address: `0x${string}`;
  /** The fee in basis points to charge for transfers */
  feeBips: number;
  /** The address of the fee collector */
  feeCollectorAddress: `0x${string}`;
  /** The balance of the creator */
  creatorBalance: bigint;
  /** The supply cap */
  supplyCap: bigint;
  /** The number of tokens minted */
  totalSupply: bigint;
  /** The transfer recipient */
  transferRecipient: `0x${string}`;
  /** The total reward points */
  totalRewardPoints: bigint;
  /** The reward basis points */
  rewardBps: number;
  /** The reward multiplier */
  rewardMultiplier: bigint;
};

export type ReferralDetail = {
  /** The address of the referrer */
  referrer: `0x${string}`;
  /** The referral code */
  referralCode: bigint;
};

export type FullState = {
  /** The state of the campaign */
  collection: CollectionState;
  /** The state of the connected account */
  subscriber: SubscriberState;
  /** The holdings of the connected account */
  holdings: ApprovedTokens;
};

///////////////////////////////////////////////

async function fetchERC20Address({
  contractAddress,
  chainId,
}: CollectionRequest): Promise<`0x${string}`> {
  return readContract({
    abi,
    address: contractAddress,
    functionName: 'erc20Address',
    chainId,
  });
}

function prepareStateMulticall(
  address: `0x${string}`,
  state: Partial<CollectionState>,
  chainId?: number,
): TMappingMulticall<CollectionState>[] {
  const contract = {
    address,
    abi,
    chainId,
  };

  state.address = address;
  return [
    {
      ...contract,
      functionName: 'paused',
      fn: (r: boolean) => (state.isPaused = r),
    },
    { ...contract, functionName: 'name', fn: (r: string) => (state.name = r) },
    {
      ...contract,
      functionName: 'symbol',
      fn: (r: string) => (state.symbol = r),
    },
    {
      ...contract,
      functionName: 'contractURI',
      fn: (r: string) => (state.contractURI = r),
    },
    {
      ...contract,
      functionName: 'baseTokenURI',
      fn: (r: string) => (state.tokenUri = r),
    },
    {
      ...contract,
      functionName: 'tps',
      fn: (r: bigint) => (state.tokensPerSecond = r),
    },
    {
      ...contract,
      functionName: 'minPurchaseSeconds',
      fn: (r: bigint) => (state.minimumPurchaseSeconds = r),
    },
    {
      ...contract,
      functionName: 'owner',
      fn: (r: `0x${string}`) => (state.ownerAddress = r),
    },
    {
      ...contract,
      functionName: 'erc20Address',
      fn: (r: `0x${string}`) => (state.erc20Address = r),
    },
    {
      ...contract,
      functionName: 'feeSchedule',
      fn: (r: [`0x${string}`, number]) => {
        state.feeCollectorAddress = r[0];
        state.feeBips = r[1];
      },
    },
    {
      ...contract,
      functionName: 'rewardMultiplier',
      fn: (r: bigint) => (state.rewardMultiplier = r),
    },
    {
      ...contract,
      functionName: 'supplyDetail',
      fn: (r: [bigint, bigint]) => {
        state.totalSupply = r[0];
        state.supplyCap = r[1];
      },
    },
    {
      ...contract,
      functionName: 'creatorBalance',
      fn: (r: bigint) => (state.creatorBalance = r),
    },
    {
      ...contract,
      functionName: 'transferRecipient',
      fn: (r: `0x${string}`) => (state.transferRecipient = r),
    },
    {
      ...contract,
      functionName: 'totalRewardPoints',
      fn: (r: bigint) => (state.totalRewardPoints = r),
    },
    {
      ...contract,
      functionName: 'rewardBps',
      fn: (r: number) => (state.rewardBps = r),
    },
  ];
}

function prepareSubscriberStateMulticall(
  address: `0x${string}`,
  account: `0x${string}`,
  state: Partial<SubscriberState>,
  chainId?: number,
): TMappingMulticall<SubscriberState>[] {
  const contract = {
    address,
    abi,
    chainId,
  };

  state.address = account;
  return [
    {
      ...contract,
      functionName: 'subscriptionOf',
      args: [account],
      fn: (r: [bigint, bigint, bigint, bigint]) => {
        state.tokenId = r[0];
        state.secondsPurchased = r[1];
        state.rewardPoints = r[2];
        state.expiresAt = new Date(Number(r[3]) * 1000);
      },
    },
    {
      ...contract,
      functionName: 'refundableBalanceOf',
      args: [account],
      fn: (r: bigint) => (state.refundableSeconds = r),
    },
    {
      ...contract,
      functionName: 'rewardBalanceOf',
      args: [account],
      fn: (r: bigint) => (state.rewardBalance = r),
    },
  ];
}

/////////////////////
/// Introspection ///
/////////////////////

/**
 * @description Fetches all relevant state for a subscription NFT
 * @param request The campaign to fetch the state of
 * @returns The state of the campaign
 */
export async function fetchCollectionState({
  contractAddress,
  chainId,
}: CollectionRequest): Promise<CollectionState> {
  const state: Partial<CollectionState> = {};
  await mapMulticall(prepareStateMulticall(contractAddress, state, chainId));
  return state as CollectionState;
}

/**
 * @description Fetches all relevant state for the connected account in the context of a subscription NFT
 * @param request The holder request
 * @returns The holder state
 */
export async function fetchSubscriberState({
  contractAddress,
  account,
  chainId,
}: SubscriberRequest): Promise<SubscriberState> {
  const state: Partial<SubscriberState> = {};
  await mapMulticall(
    prepareSubscriberStateMulticall(contractAddress, account, state, chainId),
  );
  return state as SubscriberState;
}

/**
 * Fetches all relevant state for a collection and subscriber
 * @param request The request to fetch the context for
 * @returns The context for the contract and account
 * @throws If the context cannot be fetched
 */
export async function fetchContext({
  contractAddress,
  account,
  chainId,
}: SubscriberRequest): Promise<FullState> {
  const contractState: Partial<CollectionState> = {};
  const holderState: Partial<SubscriberState> = {};
  await mapMulticall([
    ...prepareSubscriberStateMulticall(
      contractAddress,
      account,
      holderState,
      chainId,
    ),
    ...prepareStateMulticall(contractAddress, contractState, chainId),
  ]);

  const holdings: Partial<ApprovedTokens> = {};
  if (
    contractState.erc20Address &&
    contractState.erc20Address !== zeroAddress
  ) {
    await mapMulticall(
      prepareHoldingsMulticall(
        contractAddress,
        contractState.erc20Address,
        account,
        holdings,
        chainId,
      ),
    );
  } else {
    holdings.balance = (await fetchBalance({ address: account, chainId })).value;
    holdings.approved = holdings.balance;
  }

  return {
    collection: contractState as CollectionState,
    subscriber: holderState as SubscriberState,
    holdings: holdings as ApprovedTokens,
  };
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
  request: CollectionRequest & {
    referralCode: bigint;
    bps: number;
  },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'createReferralCode',
    args: [request.referralCode, request.bps],
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
  request: CollectionRequest & { referralCode: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'deleteReferralCode',
    args: [request.referralCode],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a grant time transaction for the given Subscription NFT.
 * @param request A request to grant time to accounts
 * @returns A function which will execute a prepared transaction to grant time to accounts
 * @throws If the transaction cannot be prepared
 */
export async function prepareGrantTime(
  request: GrantRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'grantTime',
    args: [request.accounts, request.numSeconds],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction for the connected account and given Subscription NFT.
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute a prepared transaction to mint or renew a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareMint(
  request: PurchaseRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchERC20Address(request)) !== zeroAddress;
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'mint',
    args: [request.amount],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction for the connected account and given Subscription NFT.
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute a prepared transaction to mint or renew a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareMintWithReferral(
  request: PurchaseRequest & ReferralDetail,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchERC20Address(request)) !== zeroAddress;
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'mintWithReferral',
    args: [request.amount, request.referralCode, request.referrer],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction for the given account and Subscription NFT.
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute a prepared transaction to mint or renew a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareMintFor(
  request: PurchaseRequest & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchERC20Address(request)) !== zeroAddress;
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'mintFor',
    args: [request.account, request.amount],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a mint transaction for the connected account and given Subscription NFT with referral data
 * @param request A request to mint or renew a subscription NFT
 * @returns A function which will execute a prepared transaction to mint or renew a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareMintWithReferralFor(
  request: PurchaseRequest & ReferralDetail & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchERC20Address(request)) !== zeroAddress;
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'mintWithReferralFor',
    args: [
      request.account,
      request.amount,
      request.referralCode,
      request.referrer,
    ],
    value: isERC20 ? 0n : request.amount,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a withdraw transaction for the connected account and given Subscription NFT.
 * @param request A request to withdraw a subscription NFT
 * @returns A function which will execute a prepared transaction to withdraw a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareWithdraw(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'withdraw',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a withdraw transaction for the connected account and given Subscription NFT and transfers fees.
 * @param request A request to withdraw a subscription NFT
 * @returns A function which will execute a prepared transaction to withdraw a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareWithdrawAndTransferFees(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'withdrawAndTransferFees',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a withdraw transaction for the given account and Subscription NFT.
 * @param request A request to withdraw a subscription NFT
 * @returns A function which will execute a prepared transaction to withdraw a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareWithdrawTo(
  request: CollectionRequest & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'withdrawTo',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a pause transaction for the given Subscription NFT.
 * @param request A request to pause a subscription NFT
 * @returns A function which will execute a prepared transaction to pause a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function preparePause(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'pause',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares an unpause transaction for the given Subscription NFT.
 * @param request A request to unpause a subscription NFT
 * @returns A function which will execute a prepared transaction to unpause a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareUnpause(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'unpause',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares an update metadata transaction for the given Subscription NFT.
 * @param request A request to update the metadata of a subscription NFT
 * @returns A function which will execute a prepared transaction to update the metadata of a subscription NFT
 * @throws If the transaction cannot be prepared
 */
export async function prepareUpdateMetadata(
  request: MetadataUpdateRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'updateMetadata',
    args: [request.contractUri, request.tokenUri],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a refund transaction for the given Subscription NFT.
 * @param request A request to refund accounts
 * @returns A function which will execute a prepared transaction to refund accounts
 * @throws If the transaction cannot be prepared
 */
export async function prepareRefund(
  request: RefundRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchERC20Address(request)) !== zeroAddress;

  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'refund',
    args: [request.credit || 0n, request.accounts],
    value: isERC20 ? 0n : request.credit || 0n,
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transfer ownership transaction for the given Subscription NFT.
 * @param request A request to transfer ownership
 * @returns A function which will execute a prepared transaction to transfer ownership
 * @throws If the transaction cannot be prepared
 */
export async function prepareTransferOwnership(
  request: OwnershipTransferRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'transferOwnership',
    args: [request.newOwner],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to set the supply cap. 0 for unlimited.
 * @param request the request to set the supply cap
 * @returns A function which will execute a prepared transaction to set the supply cap
 * @throws If the transaction cannot be prepared
 */
export async function prepareSetSupplyCap(
  request: CollectionRequest & { supplyCap: bigint },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'setSupplyCap',
    args: [request.supplyCap],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to set the transfer recipient. This allows automated balance transfers to
 * another address, via sponsored calls.
 * @param request the request to set the transfer recipient
 * @returns A function which will execute a prepared transaction to set the transfer recipient
 * @throws If the transaction cannot be prepared
 */
export async function prepareSetTransferRecipient(
  request: CollectionRequest & { recipient: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'setTransferRecipient',
    args: [request.recipient],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to transfer all balances (creator earnings + fees). This requires a transfer recipient to be set.
 * @param request the request to transfer all balances
 * @returns A function which will execute a prepared transaction to transfer all balances
 * @throws If the transaction cannot be prepared
 */
export async function prepareTransferAllBalances(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'transferAllBalances',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to slash rewards for an account that has lapsed. 30% of the rewards slashed go to the caller
 * and the rest are burned, reducing the total supply and increasing the value of the remaining points.
 * @param request the request to slash rewards
 * @returns A function which will execute a prepared transaction to slash rewards
 * @throws If the transaction cannot be prepared
 */
export async function prepareSlashRewards(
  request: CollectionRequest & { account: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'slashRewards',
    args: [request.account],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to withdraw rewards for the caller.
 * @param request the request to withdraw rewards
 * @returns A function which will execute a prepared transaction to withdraw rewards
 * @throws If the transaction cannot be prepared
 */
export async function prepareWithdrawRewards(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'withdrawRewards',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to accept ownership of the contract
 * @param request the request to accept ownership
 * @returns A function which will execute a prepared transaction to accept ownership
 * @throws If the transaction cannot be prepared
 */
export async function prepareAcceptOwnership(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'acceptOwnership',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to reconcile the ERC-20 balance of the contract with the actual balance
 * @param request the collection request
 * @returns A function which will execute a prepared transaction to reconcile the balance
 * @throws If the transaction cannot be prepared
 */
export async function prepareReconcileERC20Balance(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'reconcileERC20Balance',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to recover ERC-20 tokens that were sent to the contract by mistake
 * @param request the collection request
 * @returns A function which will execute a prepared transaction to recover the tokens
 * @throws If the transaction cannot be prepared
 */
export async function prepareRecoverERC20(
  request: RecoverERC20Request,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'recoverERC20',
    args: [request.erc20Address, request.recipient, request.amount],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to reconcile native tokens that were sent to the contract by mistake
 * @param request the collection request
 * @returns A function which will execute a prepared transaction to reconcile native tokens
 * @throws If the transaction cannot be prepared
 */
export async function prepareReconcileNativeBalance(
  request: CollectionRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'reconcileNativeBalance',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * @description Prepares a transaction to recover native tokens that were sent to the contract by mistake
 * @param request the collection request
 * @returns A function which will execute a prepared transaction to recover native tokens
 * @throws If the transaction cannot be prepared
 */
export async function prepareRecoverNativeTokens(
  request: CollectionRequest & { recipient: `0x${string}` },
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteSubscriptionTokenV1({
    address: request.contractAddress,
    functionName: 'recoverNativeTokens',
    args: [request.recipient],
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
  context: FullState,
  numTokens: bigint,
): boolean {
  if (context.collection.erc20Address === zeroAddress) {
    return false;
  }
  return numTokens > context.holdings.approved;
}

/**
 * @description Encodes a referral code as a single string
 * @param referralCode The referral code to encode
 * @returns The encoded referral code
 */
export function encodeReferral({
  referralCode,
  referrer,
}: ReferralDetail): string {
  return referrer + referralCode.toString();
}

/**
 * @description Decodes a referral code from a single string
 * @param encoded The encoded referral code
 * @returns The decoded referral code as ReferralDetail
 */
export function decodeReferral(encoded: string): ReferralDetail {
  return {
    referrer: encoded.slice(0, 42) as `0x${string}`,
    referralCode: BigInt(encoded.slice(42)),
  };
}
