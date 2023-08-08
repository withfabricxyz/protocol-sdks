import { prepareWriteContract, readContract, getNetwork } from '@wagmi/core';
import {
  subscriptionTokenV1FactoryABI as abi,
  subscriptionTokenV1FactoryAddress,
} from '../generated.js';
import { writePreparedAndFetchReceipt, getToFilteredLogs } from '../utils.js';
import { TransactionReceipt, zeroAddress } from 'viem';
import { config } from '../config/index.js';

export type CollectionConfig = {
  /** The name of the NFT */
  name: string;
  /** The symbol of the NFT */
  symbol: string;
  /** The contract metadata URI */
  contractURI: string;
  /** The token metadata URI */
  tokenURI: string;
  /** The number of tokens (wei) which buys one second of time */
  tokensPerSecond: bigint;
  /** Minimum purchase in seconds */
  minPurchaseSeconds: bigint;
  /** The percentage of the purchase amount to reward subscribers with */
  subscriberRewardBps?: number;
  /** The address of the ERC-20 token to use for purchases (0x0 for native token) */
  erc20TokenAddress?: `0x${string}`;
  /** The fee ID to use for the referral deployments (0 for default) */
  feeId?: bigint;
};

export type Deployment = {
  /** The address of the deployed subscription NFT */
  contractAddress: `0x${string}`;
  /** The transaction receipt for the deployment */
  receipt: TransactionReceipt;
};

export type FeeSchedule = {
  /** The address of the fee collector (0x0 if disabled) */
  collectorAddress: `0x${string}`;
  /** The fee in basis points to charge for all revenue */
  feeBips: number;
  /** The fee in wei to charge for deployments */
  deployFeeWei: bigint;
};

/// @dev The logs contain the contract address, so we need to scrape it
function extractDeploymentAddress(receipt: TransactionReceipt): `0x${string}` {
  return getToFilteredLogs(receipt, abi).find(
    (log) => log.eventName === 'Deployment',
  )?.args?.deployment;
}

/// @dev The factory address is configurable per network, and common networks have pre-defined values
/// @see wagmi.config.ts
function contractAddress(): `0x${string}` {
  const chainId = getNetwork().chain?.id;
  return factoryAddresses()[
    chainId as keyof typeof subscriptionTokenV1FactoryAddress
  ];
}

/**
 * @returns The factory addresses as a map from chain id to address
 */
export function factoryAddresses(): { [key: number]: `0x${string}` } {
  return {
    ...subscriptionTokenV1FactoryAddress,
    ...(config?.stpv1?.factories || {}),
  };
}

/**
 * Fetches the fee schedule for the factory
 * @param factoryAddress The address of the factory to fetch the fee schedule for
 * @returns The fee schedule for the factory
 * @throws If the fee schedule cannot be fetched
 */
export async function fetchFeeSchedule(
  factoryAddress?: `0x${string}`,
  feeId?: bigint,
): Promise<FeeSchedule> {
  const [collectorAddress, feeBips, deployFeeWei] = await readContract({
    address: factoryAddress || contractAddress(),
    abi,
    functionName: 'feeInfo',
    args: [feeId || 0n],
  });

  return {
    collectorAddress,
    feeBips,
    deployFeeWei,
  };
}

/**
 * Prepare a transaction to deploy a subscription NFT
 * @param config The configuration for the subscription NFT
 * @returns a function which will execute a validated and prepared transaction to deploy a subscription NFT.
 * @throws Error if the transaction cannot be prepared (simulate fails, etc)
 */
export async function prepareDeployment(
  config: CollectionConfig,
): Promise<() => Promise<Deployment>> {
  const addr = contractAddress();
  const { deployFeeWei } = await fetchFeeSchedule(addr);

  const txn = await prepareWriteContract({
    address: contractAddress(),
    abi,
    functionName: 'deploySubscription',
    args: [
      config.name,
      config.symbol,
      config.contractURI,
      config.tokenURI,
      config.tokensPerSecond,
      config.minPurchaseSeconds,
      config.subscriberRewardBps || 0,
      config.erc20TokenAddress || zeroAddress,
      config.feeId || 0n,
    ],
    value: deployFeeWei,
  });

  return async () => {
    const receipt = await writePreparedAndFetchReceipt(txn);
    return {
      receipt,
      contractAddress: extractDeploymentAddress(receipt),
    };
  };
}
