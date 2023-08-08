import { expect, beforeEach, test, TestContext } from 'vitest';
import { connect } from '@wagmi/core';
import { TransactionReceipt, zeroAddress } from 'viem';
import {
  setupMockConfig,
  deployCrowdFinancingContracts,
} from '../_test/utils.js';
import { prepareCampaignDeployment, CampaignConfig } from './factory.js';
import {
  prepareCampaignContribution,
  fetchCampaignAccountState,
  prepareCampaignFundsTransfer,
  prepareCampaignYield,
  prepareCampaignWithdraw,
  DepositRequest,
  CampaignRequest,
} from './campaign.js';
import {
  fetchTokenAllowance,
  prepareTokenApproval,
  ApprovalRequest,
  ApprovedTokens,
} from '../erc20/index.js';

type TCampaignTestContext = TestContext & {
  campaignAddress: `0x${string}`;
  erc20TokenAddress: `0x${string}`;
};

const MAX_GOAL = 125n;

// "stack" each step in the campaign fund lifecycle so that each contract method can be called from a test
// without having to perform each step manually per test.
const helpers = {
  async approve({
    address,
    spender,
    amount,
  }: ApprovalRequest): Promise<ApprovedTokens> {
    const { status: approvalStatus } = await (
      await prepareTokenApproval({ address, spender, amount })
    )();
    expect(approvalStatus).toEqual('success');

    return await fetchTokenAllowance({
      address,
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      spender,
    });
  },
  async contribute(config: DepositRequest): Promise<TransactionReceipt> {
    return await (
      await prepareCampaignContribution({
        campaignAddress: config.campaignAddress,
        amount: config.amount,
        erc20: config.erc20,
      })
    )();
  },
  async transfer(
    config: CampaignRequest & { erc20?: boolean },
  ): Promise<TransactionReceipt> {
    const contribution = await this.contribute({
      campaignAddress: config.campaignAddress,
      amount: MAX_GOAL,
      erc20: config.erc20,
    });
    expect(contribution.status).toEqual('success');
    return await (
      await prepareCampaignFundsTransfer(config)
    )();
  },
  async depositYield(config: DepositRequest): Promise<TransactionReceipt> {
    const transfer = await this.transfer({
      campaignAddress: config.campaignAddress,
      erc20: config.erc20,
    });
    expect(transfer.status).toEqual('success');
    return await (
      await prepareCampaignYield(config)
    )();
  },
  async withdrawYield(
    config: DepositRequest & { erc20?: boolean },
  ): Promise<TransactionReceipt> {
    const deposit = await this.depositYield({
      campaignAddress: config.campaignAddress,
      amount: config.amount,
      erc20: config.erc20,
    });
    expect(deposit.status).toEqual('success');
    return await (
      await prepareCampaignWithdraw(config)
    )();
  },
};

beforeEach(async (context: TCampaignTestContext) => {
  const wagmiConfig = setupMockConfig();
  await connect({
    connector: wagmiConfig.connectors[0],
  });
  const { factoryAddress } = await deployCrowdFinancingContracts();
  const config: CampaignConfig = {
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    minGoal: 100n,
    maxGoal: MAX_GOAL,
    minContribution: 1n,
    maxContribution: MAX_GOAL,
    holdOffSeconds: 0,
    durationSeconds: 60 * 60,
    erc20TokenAddress: zeroAddress,
    factoryAddress,
  };
  const { campaignAddress } = await (await prepareCampaignDeployment(config))();
  context.campaignAddress = campaignAddress;
});

test('[ETH] contributes to a campaign', async ({
  campaignAddress,
}: TCampaignTestContext) => {
  const { status } = await helpers.contribute({
    campaignAddress,
    amount: 10n,
  });

  expect(status).toEqual('success');

  const { contributionTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(contributionTokenBalance).toEqual(10n);
});

test('[ETH] transfers balance from a campaign to the campaign recipient', async ({
  campaignAddress,
}: TCampaignTestContext) => {
  const { status } = await helpers.transfer({
    campaignAddress,
  });

  expect(status).toEqual('success');

  const { contributionTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(contributionTokenBalance).toEqual(MAX_GOAL);
});

test('[ETH] yields funds to a campaign', async ({
  campaignAddress,
}: TCampaignTestContext) => {
  const { status } = await helpers.depositYield({
    campaignAddress,
    amount: 99n,
  });

  expect(status).toEqual('success');

  const { yieldTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(yieldTokenBalance).toEqual(99n);
});

test('[ETH] withdraws funds from a campaign', async ({
  campaignAddress,
}: TCampaignTestContext) => {
  const { status } = await helpers.withdrawYield({
    campaignAddress,
    amount: 99n,
  });

  expect(status).toEqual('success');

  const { yieldTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(yieldTokenBalance).toEqual(0n);
});
