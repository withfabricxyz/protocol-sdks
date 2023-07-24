import { writeContract, getPublicClient, readContracts } from '@wagmi/core';
import { TransactionReceipt, TransactionReceiptNotFoundError, decodeEventLog, MulticallContracts, Abi } from 'viem';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchReceipt(hash: `0x${string}`) : Promise<TransactionReceipt | null> {
  try {
    return await getPublicClient().getTransactionReceipt({ hash });
  } catch(err) {
    if(err instanceof TransactionReceiptNotFoundError) {
      return null;
    }
    throw err;
  }
}

export async function pollReceipt(hash: `0x${string}`) : Promise<TransactionReceipt> {
  // eslint-disable-next-line no-constant-condition
  while(true) {
    const receipt = await fetchReceipt(hash);
    if(receipt) {
      return receipt;
    }
    await sleep(1000);
  }
}

export async function writePreparedAndFetchReceipt(prepared: any) : Promise<TransactionReceipt> {
  const { hash } = await writeContract(prepared.request);
  return await pollReceipt(hash);
}

export function getToFilteredLogs(receipt: TransactionReceipt, abi: Abi) : any[] {
  return receipt.logs.filter((log) => log.address === receipt.to).map((log) => {
    return decodeEventLog({
      abi,
      data: log.data,
      topics: log.topics,
      strict: false,
    });
  });
}

export type TMappingMulticall<T> = MulticallContracts<any> & {
  map: (result: T) => void,
}

export async function mapMulticall<T>(contracts: readonly TMappingMulticall<T>[]) {
  const response = await readContracts({ contracts });
  response.forEach((call, index) => {
    if(!call.error) {
      contracts[index].fn(call.result);
    }

  });
}