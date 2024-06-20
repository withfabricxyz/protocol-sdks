import { simulateContract, readContract, getChainId } from '@wagmi/core';
import { stpv2FactoryAbi as abi, stpv2FactoryAddress } from '../generated.js';
import { writePreparedAndFetchReceipt } from '../utils.js';
import { TransactionReceipt, parseEventLogs } from 'viem';
import { config, wagmiConfig } from '../config/index.js';

import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';

export type DeployParams = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'deploySubscription'>['inputs']
>[0];

export type FeeSchedule = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof abi, 'feeSchedule'>['outputs']
>[0];

export type Deployment = {
  /** The address of the deployed subscription NFT */
  contractAddress: `0x${string}`;
  /** The transaction receipt for the deployment */
  receipt: TransactionReceipt;
};

/// @dev The logs contain the contract address, so we need to scrape it
function extractDeploymentAddress(receipt: TransactionReceipt): `0x${string}` {
  const logs = parseEventLogs({
    abi,
    eventName: ['Deployment'],
    logs: receipt.logs,
  });
  return logs[0]?.args?.deployment;
}

/// @dev The factory address is configurable per network, and common networks have pre-defined values
/// @see wagmi.config.ts
function contractAddress(targetChainId?: number): `0x${string}` {
  const chainId = targetChainId || getChainId(wagmiConfig());
  const address = factoryAddresses()[chainId];

  if (!address) {
    throw new Error(
      `STP Factory not defined for chain id: ${chainId}. Ensure you are connected to or using the correct network.`,
    );
  }

  return address;
}

/**
 * @returns The factory addresses as a map from chain id to address
 */
export function factoryAddresses(): { [key: number]: `0x${string}` } {
  return {
    ...(stpv2FactoryAddress || {}),
    ...(config?.stpv2?.factories || {}),
  };
}

/**
 * Fetches the fee schedule for the factory
 * @param factoryAddress The address of the factory to fetch the fee schedule for
 * @returns The fee schedule for the factory
 * @throws If the fee schedule cannot be fetched
 */
export async function fetchFeeSchedule({
  factoryAddress,
  chainId,
}: {
  factoryAddress?: `0x${string}`;
  chainId?: number;
}): Promise<FeeSchedule> {
  return readContract(wagmiConfig(), {
    address: factoryAddress || contractAddress(chainId),
    abi,
    functionName: 'feeSchedule',
    chainId,
  });
}

/**
 * Prepare a transaction to deploy a subscription NFT
 * @param config The configuration for the subscription NFT
 * @returns a function which will execute a validated and prepared transaction to deploy a subscription NFT.
 * @throws Error if the transaction cannot be prepared (simulate fails, etc)
 */
export async function prepareDeployment(
  config: DeployParams,
  chainId?: number,
): Promise<() => Promise<Deployment>> {
  const address = contractAddress(chainId);
  const { deployFee } = await fetchFeeSchedule({
    factoryAddress: address,
    chainId,
  });

  const txn = await simulateContract(wagmiConfig(), {
    address,
    abi,
    functionName: 'deploySubscription',
    args: [config],
    value: deployFee,
    chainId: chainId,
  });

  return async () => {
    const receipt = await writePreparedAndFetchReceipt(txn);
    return {
      receipt,
      contractAddress: extractDeploymentAddress(receipt),
    };
  };
}
