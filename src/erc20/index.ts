import { readContracts, prepareWriteContract } from '@wagmi/core';
import { TransactionReceipt } from 'viem';
import { erc20TokenABI } from '../generated.js';
import { writePreparedAndFetchReceipt } from '../utils.js';

export type ApprovalRequest = {
  address: `0x${string}`;
  spender: `0x${string}`;
  /** The amount of ERC-20 tokens to approve */
  amount: bigint;
}

export type AllowanceRequest = Omit<ApprovalRequest, 'amount'> & {
  owner: `0x${string}`;
};

export type ApprovedTokens = {
  /** The amount of ERC-20 tokens held */
  balance: bigint;
  /** The amount of ERC-20 tokens approved for use */
  approved: bigint;
};

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
export async function prepareTokenApproval(request: ApprovalRequest) : Promise<() => Promise<TransactionReceipt>> {
  const txn = await prepareWriteContract({
    abi: erc20TokenABI,
    address: request.address,
    functionName: 'approve',
    args: [request.spender, request.amount],
  });
  return async () => writePreparedAndFetchReceipt(txn);
}

/**
 * Fetch the approved allowance for a given account
 *
 * @param request - The allowance request
 * @returns the balance of ERC-20 tokens owned by a contributor and the allowance approved by a contributor for a campaign
 */
export async function fetchTokenAllowance(request: AllowanceRequest) : Promise<ApprovedTokens> {
  const { 0: { result: balance }, 1: { result: approved } }  = await readContracts({
    contracts: [
      {
        abi: erc20TokenABI,
        address: request.address,
        functionName: 'balanceOf',
        args: [request.owner],
      },
      {
        abi: erc20TokenABI,
        address: request.address,
        functionName: 'allowance',
        args: [request.owner, request.spender],
      },
    ],
  });

  return {
    balance: balance!,
    approved: approved!,
  };
}