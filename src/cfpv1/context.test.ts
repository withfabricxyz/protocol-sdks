import { expect, beforeEach, test, TestContext, describe } from 'vitest';
import { connect, getAccount } from '@wagmi/core';
import { setupMockConfig, deployCrowdFinancingContracts } from '../_test/utils.js';
import { prepareCampaignDeployment, CampaignConfig } from './factory.js';
import  { fetchCampaignAccountContext } from './campaign.js';

type TCampaignTestContext = TestContext & {
  campaignAddress: `0x${string}`,
  erc20TokenAddress: `0x${string}`,
}

const MAX_GOAL = 125n;

beforeEach(async (context: TCampaignTestContext) => {
  const wagmiConfig = setupMockConfig();
  await connect({
    connector: wagmiConfig.connectors[0],
  });
  const { factoryAddress, tokenAddress: erc20TokenAddress } = await deployCrowdFinancingContracts();
  const config : CampaignConfig = {
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    minGoal: 100n,
    maxGoal: MAX_GOAL,
    minContribution: 1n,
    maxContribution: MAX_GOAL,
    holdOffSeconds: 0,
    durationSeconds: 60 * 60,
    erc20TokenAddress,
    factoryAddress,
  };
  const { campaignAddress } = await (await prepareCampaignDeployment(config))();
  context.campaignAddress = campaignAddress;
  context.erc20TokenAddress = erc20TokenAddress;
});

describe('context API', () => {
  test('full story - contribute/transfer/deposit/withdraw', async ({ campaignAddress }: TCampaignTestContext) => {
    // contribute to max to trigger transferable
    let context = await fetchCampaignAccountContext({ campaignAddress, account: getAccount().address! });
    const contribution = MAX_GOAL;

    if(!context.isContributionPossible(contribution)) {
      throw new Error('No can do buckaroo ' + context.getContributePreflightResults(contribution).join(', '));
    }

    if (context.isTokenApprovalRequired(contribution)) {
      await context.prepareTokenApproval(contribution);
      const approvalReceipt = await context.executeTokenApproval();
      expect(approvalReceipt.status).toEqual('success');
    }

    await context.prepareContribution(contribution);
    const contributionReceipt = await context.executeContribution();
    expect(contributionReceipt.status).toEqual('success');

    // Refresh context to ensure new state is reflected
    context = await context.refresh();

    // do transfer to trigger yieldable
    await context.prepareTransfer();
    const transferReceipt = await context.executeTransfer();
    expect(transferReceipt.status).toEqual('success');

    // do yield to trigger withdrawable
    const yieldAmount = 420n;

    if (context.isTokenApprovalRequired(yieldAmount)) {
      await context.prepareTokenApproval(yieldAmount);
      const yieldApprovalReceipt = await context.executeTokenApproval();
      expect(yieldApprovalReceipt.status).toEqual('success');
    }

    context = await context.refresh();

    await context.prepareYield(yieldAmount);
    const yieldReceipt = await context.executeYield();
    expect(yieldReceipt.status).toEqual('success');

    // do withdraw
    await context.prepareWithdraw();
    const withdrawReceipt = await context.executeWithdraw();
    expect(withdrawReceipt.status).toEqual('success');
  });
});
