import { parseAbi } from 'viem';
import { wagmiConfig } from '../config/index.js';
import { readContract } from '@wagmi/core';

const versionAbi = parseAbi([
  `function stpVersion() external view returns (uint8)`,
]);

export async function resolveSTPVersion({
  chainId,
  contractAddress,
}: {
  chainId?: number;
  contractAddress: `0x${string}`;
}): Promise<number> {
  try {
    return await readContract(wagmiConfig(), {
      chainId,
      address: contractAddress,
      abi: versionAbi,
      functionName: 'stpVersion',
      args: [],
    });
  } catch (e: any) {
    return 1;
  }
}

export {
  type ContractRequest,
  type PayableContractRequest,
  type SubscriberRequest,
} from './common.js';
