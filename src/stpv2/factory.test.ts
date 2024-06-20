import { expect, test } from 'vitest';
import { DeployParams, prepareDeployment } from './factory.js';
import {
  deploySubscriptionNFTV2Contracts,
  wagmiTestSetup,
} from '../_test/utils.js';
import { configureFabricSDK } from '../config/index.js';
import { zeroAddress } from 'viem';
import { fetchState } from './subscription.js';

test('deploys a subscription', async () => {
  await wagmiTestSetup();
  const { factoryAddress } = await deploySubscriptionNFTV2Contracts();

  configureFabricSDK({
    stpv2: {
      factories: { 1: factoryAddress },
    },
  });

  const config: DeployParams = {
    clientFeeBps: 400,
    clientReferralShareBps: 100,
    clientFeeRecipient: '0xF1f8CAC358a4c86979AFF1bD380498206E8224B6',
    deployKey: '0x123',
    initParams: {
      name: 'Test Sub',
      symbol: 'SYM',
      contractUri: 'https://example.com/contract',
      owner: zeroAddress,
      currencyAddress: zeroAddress,
      globalSupplyCap: 200n,
    },
    rewardParams: {
      slashGracePeriod: 3600,
      slashable: false,
    },
    curveParams: {
      numPeriods: 20,
      formulaBase: 2,
      periodSeconds: 3600,
      startTimestamp: 0,
      minMultiplier: 1,
    },
    tierParams: {
      periodDurationSeconds: 3600,
      maxSupply: 10,
      maxCommitmentSeconds: 7200,
      startTimestamp: 0,
      endTimestamp: 0,
      paused: false,
      transferrable: true,
      initialMintPrice: 10000000000000n,
      pricePerPeriod: 1000000000n,
      rewardCurveId: 0,
      rewardBasisPoints: 500,
      gate: {
        gateType: 3,
        contractAddress: '0x000000000000000000000000000000000000dead',
        componentId: 1n,
        balanceMin: 1n,
      },
    },
  };

  const deployment = await (await prepareDeployment(config))();
  expect(deployment).toBeDefined();
  expect(deployment.contractAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
  expect(deployment.receipt.status).toEqual('success');

  const address = deployment.contractAddress;
  const state = await fetchState({
    contractAddress: address,
    chainId: 1,
  });

  // Heuristic check that the state is correct
  expect(state.subCount).toEqual(0n);
  expect(state.tier1.params.periodDurationSeconds).toEqual(3600);
  expect(state.tier1.params.gate.gateType).toEqual(3);
  expect(state.curve0.numPeriods).toEqual(20);
});
