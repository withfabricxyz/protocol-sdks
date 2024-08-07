import { getClient, readContracts, simulateContract } from '@wagmi/core';
import { TransactionReceipt, getContract } from 'viem';
import { erc20TokenAbi } from '../generated.js';
import { writePreparedAndFetchReceipt } from '../utils.js';
import { TMappingMulticall } from '../utils.js';
import { wagmiConfig } from '../config/index.js';

export type ApprovalRequest = {
  /** The address of the ERC-20 token */
  address: `0x${string}`;
  /** The address of spender */
  spender: `0x${string}`;
  /** The amount of ERC-20 tokens to approve */
  amount: bigint;
  /** Optional chain id (or connected chain) */
  chainId?: number;
};

export type AllowanceRequest = Omit<ApprovalRequest, 'amount'> & {
  owner: `0x${string}`;
};

export type ApprovedTokens = {
  /** The amount of ERC-20 tokens held */
  balance: bigint;
  /** The amount of ERC-20 tokens approved for use */
  approved: bigint;
};

export function loadContract({
  chainId,
  contractAddress,
}: {
  chainId?: number;
  contractAddress: `0x${string}`;
}) {
  const client = getClient(wagmiConfig(), { chainId });
  if (!client)
    throw new Error(
      `Unable to get client for chainId: ${chainId}. Please check your configuration.`,
    );
  return getContract({
    address: contractAddress,
    abi: erc20TokenAbi,
    client,
  });
}

export function prepareHoldingsMulticall(
  campaignAddress: `0x${string}`,
  erc20Address: `0x${string}`,
  account: `0x${string}`,
  state: Partial<ApprovedTokens>,
  chainId?: number,
): TMappingMulticall<ApprovedTokens>[] {
  const contract = {
    address: erc20Address,
    abi: erc20TokenAbi,
    chainId,
  };

  return [
    {
      ...contract,
      functionName: 'balanceOf',
      args: [account],
      fn: (r: bigint) => (state.balance = r),
    },
    {
      ...contract,
      functionName: 'allowance',
      args: [account, campaignAddress],
      fn: (r: bigint) => (state.approved = r),
    },
  ];
}

/**
 * Prepare a transaction to approve a campaign to spend a given amount of tokens on a contributor's behalf.
 *
 * @remarks
 * This function should be called when all inputs are ready. The returned function should be stored until user input triggers the execution.
 * This avoids common UX pitfalls with mobile wallets.
 *
 * @param request - The approval request
 * @returns a function which will execute a validated and prepared transaction to approve a campaign to spend a given amount of tokens.
 * This returned function itself executes the prepared transaction and returns a transaction receipt.
 *
 */
export async function prepareTokenApproval(
  request: ApprovalRequest,
): Promise<() => Promise<TransactionReceipt>> {
  const txn = await simulateContract(wagmiConfig(), {
    abi: erc20TokenAbi,
    address: request.address,
    functionName: 'approve',
    args: [request.spender, request.amount],
    chainId: request.chainId,
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * Fetch the approved allowance for a given account
 *
 * @param request - The allowance request
 * @returns the balance of ERC-20 tokens owned by a contributor and the allowance approved by a contributor for a campaign
 */
export async function fetchTokenAllowance(
  request: AllowanceRequest,
): Promise<ApprovedTokens> {
  const {
    0: { result: balance },
    1: { result: approved },
  } = await readContracts(wagmiConfig(), {
    contracts: [
      {
        abi: erc20TokenAbi,
        address: request.address,
        functionName: 'balanceOf',
        args: [request.owner],
        chainId: request.chainId,
      },
      {
        abi: erc20TokenAbi,
        address: request.address,
        functionName: 'allowance',
        args: [request.owner, request.spender],
        chainId: request.chainId,
      },
    ],
  });

  return {
    balance: balance!,
    approved: approved!,
  };
}
