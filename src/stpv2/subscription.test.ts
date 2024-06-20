import { expect, beforeEach, test, TestContext, beforeAll } from 'vitest';
import { getBalance, getConnections, switchAccount } from '@wagmi/core';
import {
  TransactionReceipt,
  hexToBigInt,
  numberToHex,
  parseEther,
  zeroAddress,
} from 'viem';
import { DeployParams, prepareDeployment } from './factory.js';
import {
  deploySubscriptionNFTV2Contracts,
  impersonateAccount,
  stpV2DeployParams,
  wagmiTestSetup,
} from '../_test/utils.js';
import { configureFabricSDK, wagmiConfig } from '../config/index.js';

import {
  prepareMint,
  prepareMintAdvanced,
  prepareUpdateMetadata,
  prepareCreateReferralCode,
  prepareDeleteReferralCode,
  prepareTransferOwnership,
  prepareSetSupplyCap,
  prepareSetTransferRecipient,
  subscriptionOf,
  balanceOf,
  tierBalanceOf,
  fetchState,
  prepareCreateRewardCurve,
  curveDetail,
  prepareCreateTier,
  prepareUpdateTier,
  prepareAcceptOwnership,
  referralDetail,
  prepareSetRoles,
  Role,
  prepareIssueShares,
  prepareYieldRewards,
  prepareTransferRewards,
  prepareTransferFunds,
  prepareRefund,
  prepareTopUp,
  prepareDeactivation,
  prepareGrantTime,
  prepareRevokeGrantedTime,
  prepareSlashRewards,
  prepareMulticall,
  tierDetail,
  multiTierDetail,
  fetchContext,
  fetchTokenOwners,
  fetchSubscribers,
  extractCreatedTierId,
  extractCreatedCurveId,
} from './subscription.js';
import { range } from '../utils.js';

type TSubscriptionTestContext = TestContext & {
  contractAddress: `0x${string}`;
};

const testAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const testAccount2 = '0xF1f8CAC358a4c86979AFF1bD380498206E8224B6';
const testAccount3 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

// "stack" each step in the campaign fund lifecycle so that each contract method can be called from a test
// without having to perform each step manually per test.
const helpers = {
  async mint({
    amount,
    contractAddress,
  }: {
    amount: bigint;
    contractAddress: `0x${string}`;
  }): Promise<TransactionReceipt> {
    return await (
      await prepareMint({
        contractAddress,
        amount,
        erc20: false,
      })
    )();
  },

  async ethBalance(address: `0x${string}`): Promise<bigint> {
    return (await getBalance(wagmiConfig(), { address })).value;
  },
};

beforeAll(async () => {
  await wagmiTestSetup();
  const { factoryAddress } = await deploySubscriptionNFTV2Contracts();
  configureFabricSDK({
    stpv2: {
      factories: { 1: factoryAddress },
    },
  });
});

beforeEach(async (context: TSubscriptionTestContext) => {
  const deployment = await (await prepareDeployment(stpV2DeployParams()))();
  context.contractAddress = deployment.contractAddress;
});

test('Mint', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await helpers.mint({
    contractAddress,
    amount: 1000000000n,
  });
  expect(status).toEqual('success');

  const state = await subscriptionOf({
    contractAddress,
    account: testAccount,
  });

  expect(state.tokenId).toEqual(1n);
  expect(state.expiresAt).toBeGreaterThan(Date.now() / 1000 + 3600 - 10);
  expect(state.rewardShares).toEqual(3168000000n);
  expect(state.tierId).toEqual(1);

  const context = await fetchContext({ contractAddress, account: testAccount });
  expect(context.holdings.balance).toBeGreaterThan(0);
  expect(context.subscriber.tokenId).toEqual(1n);
});

test('Mint Advanced', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareMintAdvanced({
      contractAddress,
      amount: 1000000000n,
      recipient: testAccount2,
      tierId: 1,
    })
  )();

  expect(status).toEqual('success');

  const state = await subscriptionOf({
    contractAddress,
    account: testAccount2,
  });

  expect(state.tokenId).toEqual(1n);
  expect(state.expiresAt).toBeGreaterThan(Date.now() / 1000 + 3600 - 10);
  expect(state.rewardShares).toEqual(3168000000n);
  expect(state.tierId).toEqual(1);
  expect(
    await balanceOf({ contractAddress, account: testAccount2 }),
  ).toBeGreaterThan(3590n);
  expect(
    await tierBalanceOf({ contractAddress, account: testAccount2, tierId: 1 }),
  ).toBeGreaterThan(3590n);
  expect(
    await tierBalanceOf({ contractAddress, account: testAccount2, tierId: 2 }),
  ).toEqual(0n);
});

test('Mint Referrals', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  await (
    await prepareCreateReferralCode({
      contractAddress,
      referralCode: 1n,
      bps: 1000,
    })
  )();

  expect(
    (await referralDetail({ contractAddress, code: 1n })).basisPoints,
  ).toEqual(1000);

  const preBalance = await helpers.ethBalance(testAccount3);
  const { status } = await (
    await prepareMintAdvanced({
      contractAddress,
      amount: 1000000000n,
      recipient: testAccount2,
      tierId: 1,
      referralCode: 1n,
      referrer: testAccount3,
    })
  )();

  expect(status).toEqual('success');
  const postBalance = await helpers.ethBalance(testAccount3);

  const state = await subscriptionOf({
    contractAddress,
    account: testAccount2,
  });
  expect(state.tokenId).toEqual(1n);
  expect(postBalance).toBeGreaterThan(preBalance);

  await (
    await prepareDeleteReferralCode({
      contractAddress,
      referralCode: 1n,
    })
  )();
});

test('Update Metadata', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareUpdateMetadata({
      contractAddress,
      contractUri: 'http://fun.day',
    })
  )();
  expect(status).toEqual('success');
  expect((await fetchState({ contractAddress })).contractURI).toEqual(
    'http://fun.day',
  );
});

test('Update Supply Gap', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareSetSupplyCap({
      contractAddress,
      supplyCap: 500n,
    })
  )();
  expect(status).toEqual('success');
  expect((await fetchState({ contractAddress })).supplyCap).toEqual(500n);
});

test('Set transfer Recipient', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareSetTransferRecipient({
      contractAddress,
      recipient: testAccount2,
    })
  )();
  expect(status).toEqual('success');
  expect((await fetchState({ contractAddress })).transferRecipient).toEqual(
    testAccount2,
  );
});

test('Create Curve', async ({ contractAddress }: TSubscriptionTestContext) => {
  const receipt = await (
    await prepareCreateRewardCurve({
      contractAddress,
      curve: {
        numPeriods: 6,
        formulaBase: 3,
        periodSeconds: 36000,
        startTimestamp: 0,
        minMultiplier: 0,
      },
    })
  )();
  expect(receipt.status).toEqual('success');
  const extractedId = await extractCreatedCurveId(receipt);
  expect(extractedId).toEqual(1);

  const curve = await curveDetail({ contractAddress, curveId: 1 });
  expect(curve.numPeriods).toEqual(6);
  expect(curve.formulaBase).toEqual(3);
  expect(curve.periodSeconds).toEqual(36000);
  expect(curve.startTimestamp).toBeGreaterThan(0);
  expect(curve.minMultiplier).toEqual(0);
});

test('Manage Tier', async ({ contractAddress }: TSubscriptionTestContext) => {
  const tier = {
    periodDurationSeconds: 36000,
    maxSupply: 100,
    maxCommitmentSeconds: 36000 * 12,
    startTimestamp: 0,
    endTimestamp: 0,
    paused: true,
    transferrable: false,
    initialMintPrice: 1000n,
    pricePerPeriod: 1000000000n,
    rewardCurveId: 0,
    rewardBasisPoints: 500,
    gate: {
      gateType: 0,
      contractAddress: zeroAddress,
      componentId: 0n,
      balanceMin: 0n,
    },
  };

  const receipt = await (
    await prepareCreateTier({
      contractAddress,
      tier,
    })
  )();
  expect(receipt.status).toEqual('success');

  const extractedId = await extractCreatedTierId(receipt);
  expect(extractedId).toEqual(2);
  expect((await fetchState({ contractAddress })).tierCount).toEqual(2);
  expect((await tierDetail({ contractAddress, tierId: 2 })).params).toEqual(
    tier,
  );
  expect(
    (await multiTierDetail({ contractAddress, tierIds: [1, 2] }))[1].params,
  ).toEqual(tier);

  tier.pricePerPeriod = 2000000000n;
  await (
    await prepareUpdateTier({
      contractAddress,
      tierId: 2,
      tier,
    })
  )();

  expect(
    (await tierDetail({ contractAddress, tierId: 2 })).params.pricePerPeriod,
  ).toEqual(2000000000n);
});

test('Transfer Ownership', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareTransferOwnership({
      contractAddress,
      newOwner: testAccount2,
    })
  )();
  expect(status).toEqual('success');
  expect((await fetchState({ contractAddress })).pendingOwner).toEqual(
    testAccount2,
  );

  try {
    await prepareAcceptOwnership({
      contractAddress,
    });
    expect(false).toEqual(true);
  } catch (e: any) {
    expect(e.metaMessages[0]).toEqual('Error: NotAuthorized()');
  }
});

test('Set Roles', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareSetRoles({
      contractAddress,
      account: testAccount3,
      roles: [Role.MANAGER],
    })
  )();
  expect(status).toEqual('success');

  // Assume account
  await impersonateAccount(testAccount3, async () => {
    const { status: s1 } = await (
      await prepareSetSupplyCap({
        contractAddress,
        supplyCap: 50n,
      })
    )();
    expect(s1).toEqual('success');

    try {
      await prepareSetTransferRecipient({
        contractAddress,
        recipient: testAccount2,
      });
      expect(false).toEqual(true);
    } catch (e: any) {
      expect(e.metaMessages[0]).toEqual('Error: NotAuthorized()');
    }
  });
});

test('Rewards', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareIssueShares({
      contractAddress,
      account: testAccount2,
      shares: 10000n,
    })
  )();
  expect(status).toEqual('success');

  const { status: yeet } = await (
    await prepareYieldRewards({
      contractAddress,
      value: 100000000n,
      erc20: false,
    })
  )();
  expect(yeet).toEqual('success');

  let state = await subscriptionOf({
    contractAddress,
    account: testAccount2,
  });
  expect(state.rewardBalance).toEqual(100000000n);

  const { status: transfer } = await (
    await prepareTransferRewards({
      contractAddress,
      account: testAccount2,
    })
  )();
  expect(transfer).toEqual('success');

  state = await subscriptionOf({
    contractAddress,
    account: testAccount2,
  });
  expect(state.rewardBalance).toEqual(0n);
});

test('Transfer > TopUp > Refund > Slash', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  await helpers.mint({
    contractAddress,
    amount: 1000000000n,
  });

  let state = await subscriptionOf({
    contractAddress,
    account: testAccount,
  });
  expect(state.tierId).toEqual(1);
  expect(state.tokenId).toEqual(1n);
  expect(state.rewardShares).toBeGreaterThan(0n);

  const creatorBalance = (await fetchState({ contractAddress })).creatorBalance;
  const { status } = await (
    await prepareTransferFunds({
      contractAddress,
      to: testAccount,
      amount: creatorBalance,
    })
  )();
  expect(status).toEqual('success');
  expect((await fetchState({ contractAddress })).creatorBalance).toEqual(0n);

  const { status: topUp } = await (
    await prepareTopUp({
      contractAddress,
      value: 1000000000n,
    })
  )();
  expect(topUp).toEqual('success');
  expect((await fetchState({ contractAddress })).creatorBalance).toEqual(
    1000000000n,
  );

  const { status: refund } = await (
    await prepareRefund({
      contractAddress,
      account: testAccount,
      amount: 1000000000n,
    })
  )();
  expect(refund).toEqual('success');
  expect((await fetchState({ contractAddress })).creatorBalance).toEqual(0n);

  const { status: deactivate } = await (
    await prepareDeactivation({
      contractAddress,
      account: testAccount,
    })
  )();
  expect(refund).toEqual('success');

  const { status: slash } = await (
    await prepareSlashRewards({
      contractAddress,
      account: testAccount,
    })
  )();
  expect(refund).toEqual('success');

  state = await subscriptionOf({
    contractAddress,
    account: testAccount,
  });
  expect(state.tierId).toEqual(0);
  expect(state.tokenId).toEqual(1n);
  expect(state.rewardShares).toEqual(0n);
});

test('Grant > Revoke', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status: grant } = await (
    await prepareGrantTime({
      contractAddress,
      account: testAccount,
      numSeconds: 50000,
      tierId: 0,
    })
  )();
  expect(grant).toEqual('success');

  expect(
    await balanceOf({ contractAddress, account: testAccount }),
  ).toBeGreaterThan(0n);

  const { status: revoke } = await (
    await prepareRevokeGrantedTime({
      contractAddress,
      account: testAccount,
    })
  )();
  expect(revoke).toEqual('success');

  expect(await balanceOf({ contractAddress, account: testAccount })).toEqual(
    0n,
  );
});

test('Multicall', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status: grant } = await (
    await prepareMulticall({
      contractAddress,
      calls: [
        {
          functionName: 'grantTime',
          args: [testAccount, 50000, 0],
        },
        {
          functionName: 'grantTime',
          args: [testAccount2, 50000, 0],
        },
        {
          functionName: 'grantTime',
          args: [testAccount3, 50000, 0],
        },
      ],
    })
  )();
  expect(grant).toEqual('success');
  expect(
    await balanceOf({ contractAddress, account: testAccount }),
  ).toBeGreaterThan(49000n);
  expect(
    await balanceOf({ contractAddress, account: testAccount2 }),
  ).toBeGreaterThan(49000n);
  expect(
    await balanceOf({ contractAddress, account: testAccount3 }),
  ).toBeGreaterThan(49000n);
});

test('Sub fetching', async ({ contractAddress }: TSubscriptionTestContext) => {
  const inAccounts = range(1n, 100n).map((i) => {
    return numberToHex(i, { size: 20 });
  });

  const mints: {
    functionName: 'grantTime';
    args: [`0x${string}`, number, number];
  }[] = inAccounts.map((a) => {
    return {
      functionName: 'grantTime',
      args: [a, 50000, 0],
    };
  });

  const prep = await prepareMulticall({
    contractAddress,
    calls: mints,
  });

  const { status: grant } = await prep();

  expect(grant).toEqual('success');

  const outAccounts = await fetchTokenOwners({
    contractAddress,
    fromTokenId: 1n,
    toTokenId: 100n,
  });
  expect(outAccounts.length).toEqual(inAccounts.length);
  expect(outAccounts.map((x) => x.toLowerCase())).toEqual(inAccounts);

  const subscriptions = await fetchSubscribers({
    contractAddress,
    accounts: outAccounts,
  });
  expect(subscriptions.length).toEqual(100);
  subscriptions.forEach((sub) => {
    expect(sub.tokenId).toEqual(hexToBigInt(sub.account));
  });
});
