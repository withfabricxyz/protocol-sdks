import { expect, beforeEach, test, TestContext, describe } from 'vitest';
import { zeroAddress, parseEther } from 'viem';
import { CampaignAccountContext, CampaignPreflightResult } from './context.js';

type TContext = TestContext & {
  cac: CampaignAccountContext,
}

function buildCampaignAccountContext() : CampaignAccountContext {
  return new CampaignAccountContext({
    address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
    isContributionAllowed: true,
    isTransferAllowed: false,
    isUnlockAllowed: false,
    isWithdrawAllowed: false,
    isGoalMinMet: false,
    isGoalMaxMet: false,
    yieldTotal: 0n,
    totalSupply: 0n,
    goalMin: parseEther('1'),
    goalMax: parseEther('5'),
    minAllowedContribution: parseEther('0.01'),
    maxAllowedContribution: parseEther('5'),
    startsAt: new Date(Date.now() - 60000),
    isStarted: true,
    endsAt: new Date(Date.now() + 60000),
    isEnded: false,
    recipientAddress: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
    erc20Address: zeroAddress,
    transferFeeBips: 0,
    yieldFeeBips: 0,
    feeRecipientAddress: zeroAddress,
  }, {
    address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
    minAllowedContribution: parseEther('0.01'),
    maxAllowedContribution: parseEther('5'),
    contributionTokenBalance: 0n,
    yieldTokenBalance: 0n,
  }, {
    balance: parseEther('10'),
  });
}

beforeEach(async (context: TContext) => {
  context.cac = buildCampaignAccountContext();
});

test('setup', async ({ cac }: TContext) => {
  expect(cac.isContributionPossible(parseEther('0.01'))).toEqual(true);
});

describe('contributions', () => {
  test('below min contribution', async ({ cac }: TContext) => {
    const amount = parseEther('0.001');
    expect(cac.isContributionPossible(amount)).toEqual(false);
    expect(cac.getContributePreflightResults(amount)[0]).toEqual(CampaignPreflightResult.CONTRIBUTE_TOO_LOW);
  });

  test('exceeds than max contribution', async ({ cac }: TContext) => {
    const amount = parseEther('6');
    expect(cac.isContributionPossible(amount)).toEqual(false);
    expect(cac.getContributePreflightResults(amount)[0]).toEqual(CampaignPreflightResult.CONTRIBUTE_TOO_HIGH);
  });

  test('no funds', async ({ cac }: TContext) => {
    cac.holdings.balance = parseEther('0.0001');
    const amount = parseEther('0.01');
    expect(cac.isContributionPossible(amount)).toEqual(false);
    expect(cac.getContributePreflightResults(amount)[0]).toEqual(CampaignPreflightResult.INSUFFICIENT_FUNDS);
  });

  test('not allowed', async ({ cac }: TContext) => {
    cac.state.isContributionAllowed = false;
    const amount = parseEther('0.01');
    expect(cac.isContributionPossible(amount)).toEqual(false);
    expect(cac.getContributePreflightResults(amount)[0]).toEqual(CampaignPreflightResult.CONTRIBUTE_NOT_ALLOWED);
  });
});

describe('withdraws', () => {
  test('not allowed', async ({ cac }: TContext) => {
    cac.state.isWithdrawAllowed = false;
    expect(cac.isWithdrawPossible()).toEqual(false);
    expect(cac.getWithdrawPreflightResults()[0]).toEqual(CampaignPreflightResult.WITHDRAW_NOT_ALLOWED);
  });

  test('no contribution token balance', async ({ cac }: TContext) => {
    cac.state.isEnded = true;
    cac.state.isWithdrawAllowed = true;
    cac.account.contributionTokenBalance = 0n;
    expect(cac.isWithdrawPossible()).toEqual(false);
    expect(cac.getWithdrawPreflightResults()[0]).toEqual(CampaignPreflightResult.WITHDRAW_NO_FUNDS);
  });

  test('no yield balance', async ({ cac }: TContext) => {
    cac.state.isEnded = true;
    cac.state.isGoalMaxMet = true;
    cac.state.isWithdrawAllowed = true;
    cac.account.contributionTokenBalance = 100n;
    expect(cac.isWithdrawPossible()).toEqual(false);
    expect(cac.getWithdrawPreflightResults()[0]).toEqual(CampaignPreflightResult.WITHDRAW_NO_YIELD);
  });

  test('failed campaign', async ({ cac }: TContext) => {
    cac.state.isWithdrawAllowed = true;
    cac.state.isEnded = true;
    cac.account.contributionTokenBalance = 100n;
    expect(cac.isWithdrawPossible()).toEqual(true);
  });

  test('yield', async ({ cac }: TContext) => {
    cac.state.isWithdrawAllowed = true;
    cac.state.isEnded = true;
    cac.state.isGoalMaxMet = true;
    cac.account.yieldTokenBalance = 100n;
    expect(cac.isWithdrawPossible()).toEqual(true);
  });
});

describe('transfer', () => {
  test('not allowed', ({ cac }: TContext) => {
    cac.state.isTransferAllowed = false;
    cac.state.totalSupply = 10n;
    expect(cac.isTransferPossible()).toEqual(false);
    expect(cac.getTransferPreflightResults()).toContain(CampaignPreflightResult.TRANSFER_NOT_ALLOWED);
  });

  test('funded campaign', ({ cac }: TContext) => {
    cac.state.isTransferAllowed = true;
    cac.state.totalSupply = cac.state.goalMax;
    cac.state.isEnded = true;
    expect(cac.isTransferPossible()).toEqual(true);
  });
});

describe('yield', () => {
  test('not allowed', ({ cac }: TContext) => {
    expect(cac.isYieldPossible(10n)).toEqual(false);
    expect(cac.getYieldPreflightResults(10n)[0]).toEqual(CampaignPreflightResult.YIELD_NOT_ALLOWED);
  });

  test('no holdings', ({ cac }: TContext) => {
    cac.state.isGoalMaxMet = true;
    cac.holdings.balance = 0n;
    expect(cac.isYieldPossible(10n)).toEqual(false);
    expect(cac.getYieldPreflightResults(10n)[0]).toEqual(CampaignPreflightResult.INSUFFICIENT_FUNDS);
  });

  test('allowed', ({ cac }: TContext) => {
    cac.state.isGoalMaxMet = true;
    expect(cac.isYieldPossible(10n)).toEqual(true);
  });
});
