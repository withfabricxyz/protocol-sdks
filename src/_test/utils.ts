import { localHttpUrl } from './constants.js';
import { createWalletClient, http, zeroAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Chain, localhost } from '@wagmi/core/chains';
import { createConfig, switchAccount } from '@wagmi/core';
import { WalletClient } from 'viem';
import { mock } from '@wagmi/connectors';
import {
  deploySTPLogic,
  deploySTPFactory,
  deployToken,
  deploySTPV2Logic,
  deploySTPV2Factory,
} from '../deploy.js';
import { deployCFPFactory, deployCFPLogic } from '../deploy.js';
import { configureFabricSDK, wagmiConfig } from '../config/index.js';
import { connect } from '@wagmi/core';
import { CollectionConfig } from '../stpv1/factory.js';
import { DeployParams } from '../stpv2/factory.js';

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

export async function deploySubscriptionNFTV2Contracts(): Promise<{
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
  const logicAddress = await deploySTPV2Logic(walletClient);
  const factoryAddress = await deploySTPV2Factory(walletClient, logicAddress);

  return {
    logicAddress,
    factoryAddress,
    tokenAddress,
  };
}

export function setupMockConfig() {
  return createConfig({
    chains: [anvilChain],
    pollingInterval: 10,
    connectors: [
      mock({
        accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
      }),
      mock({
        accounts: ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'],
      }),
    ],
    transports: {
      [anvilChain.id]: http(),
    },
  });
}

export async function impersonateAccount(
  address: `0x${string}`,
  fn: () => Promise<void>,
) {
  let exception;

  await connect(wagmiConfig(), {
    connector: wagmiConfig().connectors[1],
  });

  try {
    await fn();
  } catch (e) {
    exception = e;
  } finally {
    // switch back
    await connect(wagmiConfig(), {
      connector: wagmiConfig().connectors[0],
    });
  }

  if (exception) {
    throw exception;
  }
}

export async function wagmiTestSetup(): Promise<void> {
  const config = setupMockConfig();
  configureFabricSDK({ wagmiConfig: config });

  await connect(config, {
    connector: config.connectors[0],
  });
}

export function stpV1DeployParams(): CollectionConfig {
  return {
    name: 'Test',
    symbol: 'TEST',
    contractURI: 'https://example.com/contract',
    tokenURI: 'https://example.com/token',
    tokensPerSecond: 1n,
    minPurchaseSeconds: 60n,
  };
}

export function stpV2DeployParams(): DeployParams {
  return {
    clientFeeBps: 0,
    clientReferralShareBps: 0,
    clientFeeRecipient: zeroAddress,
    deployKey: '0x123',
    initParams: {
      name: 'Test Sub',
      symbol: 'SYM',
      contractUri: 'https://example.com/contract',
      owner: zeroAddress,
      currencyAddress: zeroAddress,
      globalSupplyCap: 500n,
    },
    rewardParams: {
      slashGracePeriod: 0,
      slashable: true,
    },
    curveParams: {
      numPeriods: 6,
      formulaBase: 2,
      periodSeconds: 3600,
      startTimestamp: 0,
      minMultiplier: 1,
    },
    tierParams: {
      periodDurationSeconds: 3600,
      maxSupply: 10,
      maxCommitmentSeconds: 3600 * 12,
      startTimestamp: 0,
      endTimestamp: 0,
      paused: false,
      transferrable: true,
      initialMintPrice: 0n,
      pricePerPeriod: 1000000000n,
      rewardCurveId: 0,
      rewardBasisPoints: 500,
      gate: {
        gateType: 0,
        contractAddress: zeroAddress,
        componentId: 0n,
        balanceMin: 0n,
      },
    },
  };
}
