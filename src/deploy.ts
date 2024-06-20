import {
  crowdFinancingV1FactoryAbi,
  crowdFinancingV1Abi,
  erc20TokenAbi,
  stpv2Abi,
  stpv2FactoryAbi,
} from './generated.js';
import {
  subscriptionTokenV1FactoryAbi,
  subscriptionTokenV1Abi,
} from './generated.js';

import {
  CrowdFinancingV1Bytecode,
  CrowdFinancingV1FactoryBytecode,
  ERC20TokenBytecode,
  STPV2Bytecode,
  STPV2FactoryBytecode,
} from './bytecode.js';
import {
  SubscriptionTokenV1Bytecode,
  SubscriptionTokenV1FactoryBytecode,
} from './bytecode.js';
import { WalletClient } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from './config/index.js';

async function resolveContract(
  hash: `0x${string}`,
  name: string,
): Promise<`0x${string}`> {
  const { contractAddress, status } = await waitForTransactionReceipt(
    wagmiConfig(),
    { hash },
  );
  if (status !== 'success' || !contractAddress) {
    throw new Error(`Failed to deploy contract: ${name}`);
  }
  return contractAddress;
}

/**
 * Deploy a test token
 * @param wallet the wallet to deploy from
 * @param name name of token
 * @param symbol symbol of token
 * @param numTokens number of tokens to mint to sender
 * @returns contract address
 */
export async function deployToken(
  wallet: WalletClient,
  name: string,
  symbol: string,
  numTokens: bigint,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: erc20TokenAbi,
    bytecode: ERC20TokenBytecode,
    args: [name, symbol, numTokens],
  });
  return resolveContract(hash, 'ERC20Token');
}

/**
 * Deploy STP logic contract
 * @param wallet the wallet to deploy from
 * @returns contract address
 */
export async function deploySTPV2Logic(
  wallet: WalletClient,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: stpv2Abi,
    bytecode: STPV2Bytecode,
  });
  return resolveContract(hash, 'STPV2');
}

/**
 * Deploy STP factory contract
 * @param wallet the wallet to deploy from
 * @param logicAddress address of STP logic contract
 * @returns contract address
 */
export async function deploySTPV2Factory(
  wallet: WalletClient,
  logicAddress: `0x${string}`,
  feeCollector?: `0x${string}`,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: stpv2FactoryAbi,
    bytecode: STPV2FactoryBytecode,
    args: [
      logicAddress,
      feeCollector || '0xF1f8CAC358a4c86979AFF1bD380498206E8224B6',
    ],
  });
  return resolveContract(hash, 'STPV2Factory');
}

/**
 * Deploy STP logic contract
 * @param wallet the wallet to deploy from
 * @returns contract address
 */
export async function deploySTPLogic(
  wallet: WalletClient,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: subscriptionTokenV1Abi,
    bytecode: SubscriptionTokenV1Bytecode,
  });
  return resolveContract(hash, 'SubscriptionTokenV1');
}

/**
 * Deploy STP factory contract
 * @param wallet the wallet to deploy from
 * @param logicAddress address of STP logic contract
 * @returns contract address
 */
export async function deploySTPFactory(
  wallet: WalletClient,
  logicAddress: `0x${string}`,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: subscriptionTokenV1FactoryAbi,
    bytecode: SubscriptionTokenV1FactoryBytecode,
    args: [logicAddress],
  });
  return resolveContract(hash, 'SubscriptionTokenV1Factory');
}

/**
 * Deploy CFP logic contract
 * @param logicAddress address of STP logic contract
 * @returns contract address
 */
export async function deployCFPLogic(
  wallet: WalletClient,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: crowdFinancingV1Abi,
    bytecode: CrowdFinancingV1Bytecode,
  });
  return resolveContract(hash, 'CrowdFinancingV1');
}

/**
 * Deploy CFP factory contract
 * @param wallet the wallet to deploy from
 * @param logicAddress address of CFP logic contract
 * @returns contract address
 */
export async function deployCFPFactory(
  wallet: WalletClient,
  logicAddress: `0x${string}`,
): Promise<`0x${string}`> {
  const hash = await wallet.deployContract({
    chain: wallet.chain,
    account: wallet.account!,
    abi: crowdFinancingV1FactoryAbi,
    bytecode: CrowdFinancingV1FactoryBytecode,
    args: [logicAddress],
  });
  return resolveContract(hash, 'CrowdFinancingV1Factory');
}
