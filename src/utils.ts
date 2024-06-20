import {
  writeContract,
  getPublicClient,
  readContracts,
  waitForTransactionReceipt,
} from '@wagmi/core';

import {
  TransactionReceipt,
  TransactionReceiptNotFoundError,
  MulticallContracts,
} from 'viem';

import { wagmiConfig } from './config/index.js';

export async function fetchReceipt(
  hash: `0x${string}`,
): Promise<TransactionReceipt | null> {
  try {
    return await getPublicClient(wagmiConfig())!.getTransactionReceipt({
      hash,
    });
  } catch (err) {
    if (err instanceof TransactionReceiptNotFoundError) {
      return null;
    }
    throw err;
  }
}

export async function writePreparedAndFetchReceipt(
  prepared: any,
): Promise<TransactionReceipt> {
  const hash = await writeContract(wagmiConfig(), prepared.request);
  return waitForTransactionReceipt(wagmiConfig(), { hash });
}

export type TMappingMulticall<T> = MulticallContracts<any> & {
  map: (result: T) => void;
};

export async function mapMulticall<T>(
  contracts: readonly TMappingMulticall<T>[],
) {
  const response = await readContracts(wagmiConfig(), { contracts });
  response.forEach((call, index) => {
    if (!call.error) {
      contracts[index].fn(call.result);
    }
  });
}

export function range(start: bigint, end: bigint): bigint[] {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
