import { expect, test } from 'vitest';
import { CollectionConfig, prepareDeployment } from './factory.js';
import {
  deploySubscriptionNFTContracts,
  wagmiTestSetup,
} from '../_test/utils.js';
import { configureFabricSDK } from '../config/index.js';
import { fetchCollectionState } from './subscription.js';
import { zeroAddress } from 'viem';

test('deploys a campaign', async () => {
  await wagmiTestSetup();
  const { factoryAddress } = await deploySubscriptionNFTContracts();

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
  };

  const deployment = await (await prepareDeployment(config))();
  expect(deployment).toBeDefined();
  expect(deployment.contractAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
  expect(deployment.receipt.status).toEqual('success');

  // Ensure all mapped values are correct
  const state = await fetchCollectionState({
    contractAddress: deployment.contractAddress,
  });
  expect(state.symbol).toEqual(config.symbol);
  expect(state.name).toEqual(config.name);
  expect(state.contractURI).toEqual(config.contractURI);
  expect(state.ownerAddress).toEqual(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  );
  expect(state.erc20Address).toEqual(zeroAddress);
  expect(state.tokensPerSecond).toEqual(config.tokensPerSecond);
  expect(state.minimumPurchaseSeconds).toEqual(config.minPurchaseSeconds);
  expect(state.feeBips).toEqual(0);
  expect(state.feeCollectorAddress).toEqual(zeroAddress);
});

test('deploy on unsupported chain', async () => {
  await wagmiTestSetup();

  const config: CollectionConfig = {
    name: 'Test',
    symbol: 'TEST',
    contractURI: 'https://example.com/contract',
    tokenURI: 'https://example.com/token',
    tokensPerSecond: 1n,
    minPurchaseSeconds: 60n,
    chainId: 98712398,
  };

  try {
    await prepareDeployment(config);
  } catch (e: unknown) {
    expect(e || '').toMatch(/STP Factory not defined for chain/);
  }
});
