import { expect, beforeEach, test, TestContext } from 'vitest';
import { connect } from '@wagmi/core';
import { TransactionReceipt } from 'viem';
import {
  setupMockConfig,
  deployCrowdFinancingContracts,
} from '../_test/utils.js';
import { prepareCampaignDeployment, CampaignConfig } from './factory.js';
import {
  prepareCampaignContribution,
  prepareCampaignFundsTransfer,
  prepareCampaignYield,
  prepareCampaignWithdraw,
  fetchCampaignAccountState,
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
    amount: bigint,
    config: CampaignRequest & { erc20?: boolean },
  ): Promise<TransactionReceipt> {
    const deposit = await this.depositYield({
      campaignAddress: config.campaignAddress,
      amount: amount,
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
  const { factoryAddress, tokenAddress: erc20TokenAddress } =
    await deployCrowdFinancingContracts();
  const config: CampaignConfig = {
    recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    minGoal: 100n,
    maxGoal: MAX_GOAL,
    minContribution: 1n,
    maxContribution: MAX_GOAL,
    holdOffSeconds: 0,
    durationSeconds: 60 * 60,
    erc20TokenAddress: erc20TokenAddress,
    factoryAddress,
  };
  const { campaignAddress } = await (await prepareCampaignDeployment(config))();
  context.campaignAddress = campaignAddress;
  context.erc20TokenAddress = erc20TokenAddress;
});

test('[ERC-20] contributes to a campaign', async ({
  campaignAddress,
  erc20TokenAddress,
}: TCampaignTestContext) => {
  const contribution = 10n;
  const allowance = await helpers.approve({
    address: erc20TokenAddress,
    spender: campaignAddress,
    amount: contribution,
  });
  expect(allowance.approved).toEqual(contribution);

  const { status: contributionStatus } = await helpers.contribute({
    campaignAddress,
    amount: contribution,
    erc20: true,
  });
  expect(contributionStatus).toEqual('success');

  const { contributionTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(contributionTokenBalance).toEqual(contribution);
});

test('[ERC-20] yields funds to a campaign', async ({
  campaignAddress,
  erc20TokenAddress,
}: TCampaignTestContext) => {
  const contribution = MAX_GOAL;
  const yieldAmount = 99n;
  const totalApproval = contribution + yieldAmount;
  const allowance = await helpers.approve({
    address: erc20TokenAddress,
    spender: campaignAddress,
    amount: totalApproval,
  });
  expect(allowance.approved).toEqual(totalApproval);

  const { status } = await helpers.depositYield({
    campaignAddress,
    amount: yieldAmount,
    erc20: true,
  });

  expect(status).toEqual('success');

  const { yieldTokenBalance } = await fetchCampaignAccountState({
    campaignAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(yieldTokenBalance).toEqual(yieldAmount);
});
