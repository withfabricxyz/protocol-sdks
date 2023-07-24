import { expect, test } from 'vitest';
import { CampaignConfig, prepareCampaignDeployment } from './factory.js';

import { setupMockConfig, deployCrowdFinancingContracts } from '../_test/utils.js';
import { connect } from '@wagmi/core';
import { zeroAddress } from 'viem';
import { fetchCampaignState } from './campaign.js';

test('deploys a campaign', async () => {
  const wagmiConfig = setupMockConfig();
  await connect({
    connector: wagmiConfig.connectors[0],
  });
  const { factoryAddress } = await deployCrowdFinancingContracts();

  const config : CampaignConfig = {
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    minGoal: 100n,
    maxGoal: 1000n,
    minContribution: 1n,
    maxContribution: 100n,
    holdOffSeconds: 60,
    durationSeconds: 60 * 60,
    erc20TokenAddress: zeroAddress,
    factoryAddress,
  };

  const deployment = await (await prepareCampaignDeployment(config))();
  expect(deployment).toBeDefined();
  expect(deployment.campaignAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
  expect(deployment.receipt.status).toEqual('success');

  // Ensure all mapped values are correct
  const state = await fetchCampaignState({ campaignAddress: deployment.campaignAddress });
  expect(state.recipientAddress).toEqual(config.recipientAddress);
  expect(state.goalMin).toEqual(config.minGoal);
  expect(state.goalMax).toEqual(config.maxGoal);
  expect(state.minAllowedContribution).toEqual(config.minContribution);
  expect(state.maxAllowedContribution).toEqual(config.maxContribution);
  expect(state.erc20Address).toEqual(zeroAddress);
  expect(state.endsAt.getTime() - state.startsAt.getTime()).toEqual(config.durationSeconds * 1000);
});
