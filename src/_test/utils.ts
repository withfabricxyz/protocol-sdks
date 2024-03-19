import { localHttpUrl } from './constants.js';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Chain, localhost } from '@wagmi/core/chains';
import { createConfig } from '@wagmi/core';
import { WalletClient } from 'viem';
import { mock } from '@wagmi/connectors';
import { deploySTPLogic, deploySTPFactory, deployToken } from '../deploy.js';
import { deployCFPFactory, deployCFPLogic } from '../deploy.js';
import { configureFabricSDK } from '../config/index.js';
import { connect } from '@wagmi/core';

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
  return createConfig({
    chains: [anvilChain],
    connectors: [
      mock({
        accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266']
      }),
    ],
    transports: {
      [anvilChain.id]: http(),
    },
  });
}

export async function wagmiTestSetup() : Promise<void> {
  const config = setupMockConfig();
  configureFabricSDK({ wagmiConfig: config });

  await connect(config, {
    connector: config.connectors[0],
  });
}
