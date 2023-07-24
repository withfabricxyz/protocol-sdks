import {
  localHttpUrl,
} from './constants.js';

import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Chain, localhost } from '@wagmi/chains';
import { WalletClient, configureChains, createConfig } from '@wagmi/core';
import { crowdFinancingV1FactoryABI, crowdFinancingV1ABI, erc20TokenABI } from '../generated.js';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { publicProvider } from '@wagmi/core/providers/public';
import { pollReceipt } from '../utils.js';

import { CrowdFinancingV1Bytecode, CrowdFinancingV1FactoryBytecode, ERC20TokenBytecode } from '../bytecode.js';

export const anvilChain = {
  ...localhost,
  id: 1,
  rpcUrls: {
    default: {
      http: [localHttpUrl],
    },
    public: {
      http: [localHttpUrl],
    },
  },
} as const satisfies Chain;

export function buildWalletClient() : WalletClient {
  return createWalletClient({
    account: privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'),
    transport: http(),
    chain: anvilChain,
    key: 'mock',
    name: 'Mock',
  });
}

export async function deployCrowdFinancingContracts() : Promise<{ logicAddress: `0x${string}`, factoryAddress: `0x${string}`, tokenAddress: `0x${string}` }> {
  const walletClient = buildWalletClient();
  const tokenHash = await walletClient.deployContract({
    abi: erc20TokenABI,
    bytecode: ERC20TokenBytecode,
    args: [
      'Test Token',
      'TEST',
      1000000000000000000000000000n,
    ],
  });
  const { contractAddress: tokenAddress, status: tokenStatus } = await pollReceipt(tokenHash);

  const logicHash = await walletClient.deployContract({
    abi: crowdFinancingV1ABI,
    bytecode: CrowdFinancingV1Bytecode,
  });

  const { contractAddress: logicAddress, status: logicStatus } = await pollReceipt(logicHash);
  const factoryHash = await walletClient.deployContract({
    abi: crowdFinancingV1FactoryABI,
    bytecode: CrowdFinancingV1FactoryBytecode,
    args: [
      logicAddress!,
    ],
  });

  const { contractAddress: factoryAddress, status: factoryStatus } = await pollReceipt(factoryHash);

  if([tokenStatus, logicStatus, factoryStatus].some((status : string) => status !== 'success')) {
    throw new Error('Failed to deploy contracts');
  }

  return {
    logicAddress: logicAddress!,
    factoryAddress: factoryAddress!,
    tokenAddress: tokenAddress!,
  };
}

export function setupMockConfig() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [anvilChain],
    [
      publicProvider(),
    ],
  );

  const connector = new MockConnector({
    chains: chains,
    options: {
      walletClient: buildWalletClient(),
      flags: {
        isAuthorized: true,
      },
    },
  });

  return createConfig({
    connectors: [
      connector,
    ],
    publicClient,
    webSocketPublicClient,
  });
}