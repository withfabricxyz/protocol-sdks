import { expect, beforeEach, test, TestContext } from 'vitest';
import { connect } from '@wagmi/core';
import { parseEther } from 'viem';
import { CollectionConfig, prepareDeployment } from './factory.js';
import {
  setupMockConfig,
  deploySubscriptionNFTContracts,
} from '../_test/utils.js';
import { configureFabricSDK } from '../config/index.js';

import { prepareMint, prepareMintFor } from './subscription.js';
import { prepareTokenApproval } from '../erc20/index.js';

type TSubscriptionTestContext = TestContext & {
  contractAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
};

beforeEach(async (context: TSubscriptionTestContext) => {
  const wagmiConfig = setupMockConfig();
  await connect({
    connector: wagmiConfig.connectors[0],
  });
  const { factoryAddress, tokenAddress } =
    await deploySubscriptionNFTContracts();
  configureFabricSDK({
    stpv1: {
      factories: { 1: factoryAddress },
    },
  });

  const config: CollectionConfig = {
    name: 'Test',
    symbol: 'TEST',
    contractURI: 'https://example.com/contract',
    tokenURI: 'https://example.com/token',
    tokensPerSecond: 1n,
    minPurchaseSeconds: 60n,
    erc20TokenAddress: tokenAddress,
  };

  const deployment = await (await prepareDeployment(config))();
  context.contractAddress = deployment.contractAddress;
  context.tokenAddress = tokenAddress;

  const { status: approvalStatus } = await (
    await prepareTokenApproval({
      address: tokenAddress,
      spender: deployment.contractAddress,
      amount: parseEther('1'),
    })
  )();
  expect(approvalStatus).toEqual('success');
});

test('Mint', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareMint({
      contractAddress: contractAddress,
      amount: parseEther('1'),
      erc20: true,
    })
  )();
  expect(status).toEqual('success');
});

test('Mint For', async ({ contractAddress }: TSubscriptionTestContext) => {
  const account = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265';
  const { status } = await (
    await prepareMintFor({
      contractAddress: contractAddress,
      amount: 1800n,
      account,
      erc20: true,
    })
  )();
  expect(status).toEqual('success');
});
