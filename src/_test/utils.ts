import { localHttpUrl } from './constants.js';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Chain, localhost } from '@wagmi/core/chains';
import { WalletClient, configureChains, createConfig } from '@wagmi/core';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { publicProvider } from '@wagmi/core/providers/public';
import { deploySTPLogic, deploySTPFactory, deployToken } from '../deploy.js';
import { deployCFPFactory, deployCFPLogic } from '../deploy.js';

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

export function buildWalletClient(): WalletClient {
  return createWalletClient({
    account: privateKeyToAccount(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    ),
    transport: http(),
    chain: anvilChain,
    key: 'mock',
    name: 'Mock',
  });
}

export async function deployCrowdFinancingContracts(): Promise<{
  logicAddress: `0x${string}`;
  factoryAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
}> {
  const walletClient = buildWalletClient();
  const tokenAddress = await deployToken(
    walletClient,
    'Test Token',
    'TEST',
    1000000000000000000000000000n,
  );
  const logicAddress = await deployCFPLogic(walletClient);
  const factoryAddress = await deployCFPFactory(walletClient, logicAddress);

  return {
    logicAddress,
    factoryAddress,
    tokenAddress,
  };
}

export async function deploySubscriptionNFTContracts(): Promise<{
  logicAddress: `0x${string}`;
  factoryAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
}> {
  const walletClient = buildWalletClient();
  const tokenAddress = await deployToken(
    walletClient,
    'Test Token',
    'TEST',
    1000000000000000000000000000n,
  );
  const logicAddress = await deploySTPLogic(walletClient);
  const factoryAddress = await deploySTPFactory(walletClient, logicAddress);

  return {
    logicAddress,
    factoryAddress,
    tokenAddress,
  };
}

export function setupMockConfig() {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [anvilChain],
    [publicProvider()],
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
    connectors: [connector],
    publicClient,
    webSocketPublicClient,
  });
}
