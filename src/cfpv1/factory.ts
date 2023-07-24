import { prepareWriteContract, readContract, getNetwork } from '@wagmi/core';
import { crowdFinancingV1FactoryABI as abi, crowdFinancingV1FactoryAddress } from '../generated.js';
import { writePreparedAndFetchReceipt, getToFilteredLogs } from '../utils.js';
import { TransactionReceipt, zeroAddress } from 'viem';
import { config } from '../config/index.js';

export type CampaignConfig = {
  /** Where raised funds are transfered */
  recipientAddress: `0x${string}`,
  /** The minimum number of tokens required for success */
  minGoal: bigint,
  /** The max number of tokens accepted (hard cap) */
  maxGoal: bigint,
  /** The minimum amount an individual account can contribute */
  minContribution: bigint,
  /** The maximum amount an individual account can contribute */
  maxContribution: bigint,
  /** The number of seconds to wait before starting the campaign */
  holdOffSeconds: number,
  /** The number of seconds to run the campaign for */
  durationSeconds: number,
  /** The address of the ERC-20 token to use for the campaign (0x0 for native token) */
  erc20TokenAddress?: `0x${string}`,
  /** The address of the factory to use for the campaign */
  factoryAddress?: `0x${string}`,
}

export type CampaignDeployment = {
  /** The address of the deployed campaign */
  campaignAddress: `0x${string}`,
  /** The transaction receipt for the deployment */
  receipt: TransactionReceipt,
}

export type FeeSchedule = {
  /** The address of the fee collector (0x0 if disabled) */
  collectorAddress: `0x${string}`,
  /** The fee in basis points to charge for transfers */
  transferFeeBips: number,
  /** The fee in basis points to charge for yield */
  yieldFeeBips: number,
  /** The fee in wei to charge for deployments */
  deployFeeWei: bigint,
}

function extractDeploymentAddress(receipt : TransactionReceipt) : `0x${string}` {
  return getToFilteredLogs(receipt, abi).find((log) => log.eventName === 'Deployment')?.args?.deployment;
}

function contractAddress() : `0x${string}` {
  const chainId = getNetwork().chain?.id;
  return config?.crowdFiFactoryOverrides?.[chainId as keyof typeof config.crowdFiFactoryOverrides] || crowdFinancingV1FactoryAddress[
    chainId as keyof typeof crowdFinancingV1FactoryAddress
  ];
}

/**
 * Fetches the fee schedule for the factory
 * @param factoryAddress The address of the factory to fetch the fee schedule for
 * @returns The fee schedule for the factory
 * @throws If the fee schedule cannot be fetched
 */
export async function fetchFeeSchedule(factoryAddress?: `0x${string}`) : Promise<FeeSchedule> {
  const [collectorAddress, transferFeeBips, yieldFeeBips, deployFeeWei] = await readContract({
    address: factoryAddress || contractAddress(),
    abi,
    functionName: 'feeSchedule',
  });

  return {
    collectorAddress,
    transferFeeBips,
    yieldFeeBips,
    deployFeeWei,
  };
}

/**
 * Prepares a campaign deployment
 *
 * @param config The configuration for the campaign deployment
 * @returns An async function that when called will deploy the campaign
 * @throws If the campaign cannot be deployed
 * @example
 *
 * ```ts
 * const preparedTxn = await prepareCampaignDeployment({
 *   recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
 *   minGoal: 100n,
 *   maxGoal: 1000n,
 *   minContribution: 1n,
 *   maxContribution: 1000n,
 *   holdOffSeconds: 0,
 *   durationSeconds: 60 * 60 * 24,
 * });
 *
 * const { receipt, campaignAddress } = await preparedTxn();
 * ```
 */
export async function prepareCampaignDeployment(config: CampaignConfig) : Promise<() => Promise<CampaignDeployment>> {
  const { deployFeeWei } = await fetchFeeSchedule(config.factoryAddress);

  const txn = await prepareWriteContract({
    address: config.factoryAddress || contractAddress(),
    abi,
    functionName: 'deployCampaign',
    args: [
      config.recipientAddress,
      config.minGoal,
      config.maxGoal,
      config.minContribution,
      config.maxContribution,
      config.holdOffSeconds,
      config.durationSeconds,
      config.erc20TokenAddress || zeroAddress,
    ],
    value: deployFeeWei,
  });

  return async () => {
    const receipt = await writePreparedAndFetchReceipt(txn);
    return {
      receipt,
      campaignAddress: extractDeploymentAddress(receipt),
    };
  };
}
