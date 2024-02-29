import { fetchBalance, readContract } from '@wagmi/core';
import { TransactionReceipt, zeroAddress } from 'viem';
import {
  prepareWriteCrowdFinancingV1,
  crowdFinancingV1ABI,
} from '../generated.js';
import {
  writePreparedAndFetchReceipt,
  mapMulticall,
  TMappingMulticall,
} from '../utils.js';
import { prepareHoldingsMulticall, ApprovedTokens } from '../erc20/index.js';

export type CampaignRequest = {
  /** The contract address of the campaign */
  campaignAddress: `0x${string}`;
  /** Optional chain id (otherwise the connected chain) */
  chainId?: number;
};

export type CampaignAccountRequest = CampaignRequest & {
  /** The account address */
  account: `0x${string}`;
};

export type DepositRequest = CampaignRequest & {
  /** The amount of tokens to contribute */
  amount: bigint;
  erc20?: boolean;
};

export type AccountState = {
  /** The address of the account */
  address: `0x${string}`;
  /** The minimum amount of tokens the account can contribute */
  minAllowedContribution: bigint;
  /** The maximum amount of tokens the account can contribute */
  maxAllowedContribution: bigint;
  /** The amount of tokens the account has contributed */
  contributionTokenBalance: bigint;
  /** The amount of tokens the account may withdraw from creator yield */
  yieldTokenBalance: bigint;
};

export type CampaignState = {
  /** The address of the campaign */
  address: `0x${string}`;
  /** Can accounts contribute */
  isContributionAllowed: boolean;
  /** Can accounts transfer */
  isTransferAllowed: boolean;
  /** Can accounts unlock */
  isUnlockAllowed: boolean;
  /** Can accounts withdraw */
  isWithdrawAllowed: boolean;
  /** Has the minimum goal been met */
  isGoalMinMet: boolean;
  /** Has the maximum goal been met */
  isGoalMaxMet: boolean;
  /** The total amount of yielded tokens */
  yieldTotal: bigint;
  /** The total amount of contribution tokens */
  totalSupply: bigint;
  /** The minimum goal */
  goalMin: bigint;
  /** The maximum goal */
  goalMax: bigint;
  /** The minimum amount an account can contribute */
  minAllowedContribution: bigint;
  /** The maximum amount an account can contribute */
  maxAllowedContribution: bigint;
  /** The date the campaign starts */
  startsAt: Date;
  /** Has the campaign started */
  isStarted: boolean;
  /** The date the campaign ends */
  endsAt: Date;
  /** Has the campaign ended */
  isEnded: boolean;
  /** The address of the funds recipient */
  recipientAddress: `0x${string}`;
  /** The address of the ERC-20 token used for the campaign */
  erc20Address: `0x${string}`;
  /** The fee in basis points to charge for transfers */
  transferFeeBips: number;
  /** The fee in basis points to charge for yield */
  yieldFeeBips: number;
  /** The address of the fee collector */
  feeRecipientAddress: `0x${string}`;
};

export type FullState = {
  campaign: CampaignState;
  account: AccountState;
  holdings: ApprovedTokens;
};

async function fetchCampaignERC20Address({
  campaignAddress,
}: CampaignRequest): Promise<`0x${string}`> {
  return readContract({
    abi: crowdFinancingV1ABI,
    address: campaignAddress,
    functionName: 'erc20Address',
  });
}

function prepareStateMulticall(
  address: `0x${string}`,
  state: Partial<CampaignState>,
  chainId?: number,
): TMappingMulticall<CampaignState>[] {
  const contract = {
    address,
    abi: crowdFinancingV1ABI,
    chainId,
  };

  state.address = address;
  return [
    {
      ...contract,
      functionName: 'isContributionAllowed',
      fn: (r: boolean) => (state.isContributionAllowed = r),
    },
    {
      ...contract,
      functionName: 'isTransferAllowed',
      fn: (r: boolean) => (state.isTransferAllowed = r),
    },
    {
      ...contract,
      functionName: 'isUnlockAllowed',
      fn: (r: boolean) => (state.isUnlockAllowed = r),
    },
    {
      ...contract,
      functionName: 'isWithdrawAllowed',
      fn: (r: boolean) => (state.isWithdrawAllowed = r),
    },
    {
      ...contract,
      functionName: 'isGoalMinMet',
      fn: (r: boolean) => (state.isGoalMinMet = r),
    },
    {
      ...contract,
      functionName: 'isGoalMaxMet',
      fn: (r: boolean) => (state.isGoalMaxMet = r),
    },
    {
      ...contract,
      functionName: 'yieldTotal',
      fn: (r: bigint) => (state.yieldTotal = r),
    },
    {
      ...contract,
      functionName: 'totalSupply',
      fn: (r: bigint) => (state.totalSupply = r),
    },
    {
      ...contract,
      functionName: 'goalMin',
      fn: (r: bigint) => (state.goalMin = r),
    },
    {
      ...contract,
      functionName: 'goalMax',
      fn: (r: bigint) => (state.goalMax = r),
    },
    {
      ...contract,
      functionName: 'minAllowedContribution',
      fn: (r: bigint) => (state.minAllowedContribution = r),
    },
    {
      ...contract,
      functionName: 'maxAllowedContribution',
      fn: (r: bigint) => (state.maxAllowedContribution = r),
    },
    {
      ...contract,
      functionName: 'startsAt',
      fn: (r: bigint) => (state.startsAt = new Date(Number(r) * 1000)),
    },
    {
      ...contract,
      functionName: 'isStarted',
      fn: (r: boolean) => (state.isStarted = r),
    },
    {
      ...contract,
      functionName: 'endsAt',
      fn: (r: bigint) => (state.endsAt = new Date(Number(r) * 1000)),
    },
    {
      ...contract,
      functionName: 'isEnded',
      fn: (r: boolean) => (state.isEnded = r),
    },
    {
      ...contract,
      functionName: 'recipientAddress',
      fn: (r: `0x${string}`) => (state.recipientAddress = r),
    },
    {
      ...contract,
      functionName: 'erc20Address',
      fn: (r: `0x${string}`) => (state.erc20Address = r),
    },
    {
      ...contract,
      functionName: 'transferFeeBips',
      fn: (r: number) => (state.transferFeeBips = r),
    },
    {
      ...contract,
      functionName: 'yieldFeeBips',
      fn: (r: number) => (state.yieldFeeBips = r),
    },
    {
      ...contract,
      functionName: 'feeRecipientAddress',
      fn: (r: `0x${string}`) => (state.feeRecipientAddress = r),
    },
  ];
}

function prepareAccountStateMulticall(
  campaignAddress: `0x${string}`,
  account: `0x${string}`,
  state: Partial<AccountState>,
  chainId?: number,
): TMappingMulticall<AccountState>[] {
  const contract = {
    address: campaignAddress,
    abi: crowdFinancingV1ABI,
    chainId,
  };

  state.address = account;
  return [
    {
      ...contract,
      functionName: 'balanceOf',
      args: [account],
      fn: (r: bigint) => (state.contributionTokenBalance = r),
    },
    {
      ...contract,
      functionName: 'yieldBalanceOf',
      args: [account],
      fn: (r: bigint) => (state.yieldTokenBalance = r),
    },
    {
      ...contract,
      functionName: 'contributionRangeFor',
      args: [account],
      fn: (r: [bigint, bigint]) => {
        state.minAllowedContribution = r[0];
        state.maxAllowedContribution = r[1];
      },
    },
  ];
}

/// Introspection ///

/**
 * Fetches all state for a campaign
 *
 * @param request The campaign to fetch the state of
 * @returns The state of the campaign
 */
export async function fetchCampaignState({
  campaignAddress,
  chainId,
}: CampaignRequest): Promise<CampaignState> {
  const state: Partial<CampaignState> = {};
  await mapMulticall(prepareStateMulticall(campaignAddress, state, chainId));
  return state as CampaignState;
}

/**
 * Fetches the account state for a given campaign
 *
 * @param request The campaign and account to fetch the state of
 * @returns The state of an account for a given campaign
 */
export async function fetchCampaignAccountState({
  campaignAddress,
  account,
  chainId,
}: CampaignAccountRequest): Promise<AccountState> {
  const state: Partial<AccountState> = {};
  await mapMulticall(
    prepareAccountStateMulticall(campaignAddress, account, state, chainId),
  );
  return state as AccountState;
}

/**
 * Build a context object to interact with a campaign for a given account
 *
 * @param request The campaign and account to build context for
 * @returns A context object for the given campaign and account
 */
export async function fetchFullState({
  campaignAddress,
  account,
  chainId,
}: CampaignAccountRequest): Promise<FullState> {
  const campaignState: Partial<CampaignState> = {};
  const accountState: Partial<AccountState> = {};
  await mapMulticall([
    ...prepareAccountStateMulticall(
      campaignAddress,
      account,
      accountState,
      chainId,
    ),
    ...prepareStateMulticall(campaignAddress, campaignState, chainId),
  ]);

  const holdings: Partial<ApprovedTokens> = {};
  if (
    campaignState.erc20Address &&
    campaignState.erc20Address !== zeroAddress
  ) {
    await mapMulticall(
      prepareHoldingsMulticall(
        campaignAddress,
        campaignState.erc20Address,
        account,
        holdings,
        chainId,
      ),
    );
  } else {
    holdings.balance = (await fetchBalance({ address: account, chainId })).value;
  }

  return {
    campaign: campaignState as CampaignState,
    account: accountState as AccountState,
    holdings: holdings as ApprovedTokens,
  };
}

/// Transactions ///

/**
 * Prepares a contribute transaction for the connected account and given campaign.
 *
 * @param request A request to contribute funds into a campaign
 * @returns A function which will execute a prepared transaction to contribute funds into a campaign
 */
export async function prepareCampaignContribution(
  request: DepositRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchCampaignERC20Address(request)) !== zeroAddress;

  const txn = isERC20
    ? await prepareWriteCrowdFinancingV1({
        address: request.campaignAddress,
        functionName: 'contributeERC20',
        args: [request.amount],
        chainId: request.chainId,
      })
    : await prepareWriteCrowdFinancingV1({
        address: request.campaignAddress,
        functionName: 'contributeEth',
        value: request.amount,
        chainId: request.chainId,
      });

  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * Prepares a transfer transaction for the connected account and given campaign.
 *
 * @param request A request to transfer funds from a campaign to it's recipient
 * @returns A function which will execute a prepared transaction to transfer funds from a campaign to it's recipient
 */
export async function prepareCampaignFundsTransfer(
  request: CampaignRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteCrowdFinancingV1({
    address: request.campaignAddress,
    functionName: 'transferBalanceToRecipient',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * Prepares a yield transaction for the connected account and given campaign.
 *
 * @param request A deposit request for the campaign
 * @returns A function which will execute a prepared transaction to yield funds to a campaign and it's contributors
 */
export async function prepareCampaignYield(
  request: DepositRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const isERC20 =
    request.erc20 || (await fetchCampaignERC20Address(request)) !== zeroAddress;

  const txn = isERC20
    ? await prepareWriteCrowdFinancingV1({
        address: request.campaignAddress,
        functionName: 'yieldERC20',
        args: [request.amount],
        chainId: request.chainId,
      })
    : await prepareWriteCrowdFinancingV1({
        address: request.campaignAddress,
        functionName: 'yieldEth',
        value: request.amount,
        chainId: request.chainId,
      });

  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * Prepares a withdraw transaction for the connected account and given campaign.
 *
 * @param request The campaign to withdraw from
 * @returns A function which will execute a prepared transaction to withdraw funds from a campaign.
 */
export async function prepareCampaignWithdraw(
  request: CampaignRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteCrowdFinancingV1({
    address: request.campaignAddress,
    functionName: 'withdraw',
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}
