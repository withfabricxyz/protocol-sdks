import { expect, beforeEach, test, TestContext, beforeAll } from 'vitest';
import { getBalance } from '@wagmi/core';
import { TransactionReceipt, parseEther } from 'viem';
import { CollectionConfig, prepareDeployment } from './factory.js';
import {
  deploySubscriptionNFTContracts,
  wagmiTestSetup,
} from '../_test/utils.js';
import { configureFabricSDK, wagmiConfig } from '../config/index.js';

import {
  PurchaseRequest,
  fetchCollectionState,
  fetchSubscriberState,
  prepareMint,
  prepareMintFor,
  prepareWithdraw,
  prepareWithdrawTo,
  prepareUpdateMetadata,
  preparePause,
  prepareUnpause,
  prepareGrantTime,
  prepareRefund,
  prepareCreateReferralCode,
  prepareDeleteReferralCode,
  prepareTransferOwnership,
  prepareMintWithReferral,
  prepareMintWithReferralFor,
  prepareWithdrawAndTransferFees,
  prepareSetSupplyCap,
  prepareSetTransferRecipient,
  prepareTransferAllBalances,
  prepareWithdrawRewards,
} from './subscription.js';

type TSubscriptionTestContext = TestContext & {
  contractAddress: `0x${string}`;
};

// "stack" each step in the campaign fund lifecycle so that each contract method can be called from a test
// without having to perform each step manually per test.
const helpers = {
  async mint(config: PurchaseRequest): Promise<TransactionReceipt> {
    return await (
      await prepareMint({
        contractAddress: config.contractAddress,
        amount: config.amount,
        erc20: false,
      })
    )();
  },
};

beforeAll(async () => {
  await wagmiTestSetup();
  const { factoryAddress } = await deploySubscriptionNFTContracts();
  configureFabricSDK({
    stpv1: {
      factories: { 1: factoryAddress },
    },
  });
});

beforeEach(async (context: TSubscriptionTestContext) => {
  const config: CollectionConfig = {
    name: 'Test',
    symbol: 'TEST',
    contractURI: 'https://example.com/contract',
    tokenURI: 'https://example.com/token',
    tokensPerSecond: 1n,
    minPurchaseSeconds: 60n,
  };

  const deployment = await (await prepareDeployment(config))();
  context.contractAddress = deployment.contractAddress;
});

test('Collection state', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const state = await fetchCollectionState({
    contractAddress,
  });

  expect(state.name).toEqual('Test');
  expect(state.symbol).toEqual('TEST');
  expect(state.contractURI).toEqual('https://example.com/contract');
  expect(state.tokenUri).toEqual('https://example.com/token');
  expect(state.tokensPerSecond).toEqual(1n);
  expect(state.minimumPurchaseSeconds).toEqual(60n);
  expect(state.totalSupply).toEqual(0n);
  expect(state.isPaused).toEqual(false);
  expect(state.rewardBps).toEqual(0);
});

test('Mint', async ({ contractAddress }: TSubscriptionTestContext) => {
  const { status } = await helpers.mint({
    contractAddress,
    amount: 120n,
  });
  expect(status).toEqual('success');

  const state = await fetchSubscriberState({
    contractAddress,
    account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(state.tokenId).toEqual(1n);
  expect(state.expiresAt.getTime()).toBeGreaterThan(Date.now() + 60 * 1000);
  expect(state.refundableSeconds).toBeGreaterThan(110n);
  expect(state.refundableSeconds).toBeLessThanOrEqual(120n);
  expect(state.rewardPoints).toBeGreaterThan(120n);
  expect(state.secondsPurchased).toEqual(120n);
  expect(state.address).toEqual('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
});

test('Mint For', async ({ contractAddress }: TSubscriptionTestContext) => {
  const account = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265';
  const { status } = await (
    await prepareMintFor({
      contractAddress: contractAddress,
      amount: parseEther('1'),
      account,
      erc20: false,
    })
  )();
  expect(status).toEqual('success');

  const state = await fetchSubscriberState({
    contractAddress,
    account,
  });

  expect(state.tokenId).toEqual(1n);
});

test('Withdraw', async ({ contractAddress }: TSubscriptionTestContext) => {
  await helpers.mint({
    contractAddress,
    amount: parseEther('1'),
  });

  const { value: preValue } = await getBalance(wagmiConfig(), {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  const { status } = await (
    await prepareWithdraw({
      contractAddress,
    })
  )();

  const { value: postValue } = await getBalance(wagmiConfig(), {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  });

  expect(status).toEqual('success');
  expect(preValue).toBeLessThan(postValue);
});

test('Withdraw To', async ({ contractAddress }: TSubscriptionTestContext) => {
  await helpers.mint({
    contractAddress,
    amount: parseEther('1'),
  });

  const account = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265';
  const { value: preValue } = await getBalance(wagmiConfig(), {
    address: account,
  });

  const { status } = await (
    await prepareWithdrawTo({
      contractAddress,
      account,
    })
  )();

  const { value } = await getBalance(wagmiConfig(), {
    address: account,
  });

  expect(status).toEqual('success');
  expect(value).toEqual(preValue + parseEther('1'));
});

test('Withdraw All', async ({ contractAddress }: TSubscriptionTestContext) => {
  await helpers.mint({
    contractAddress,
    amount: parseEther('1'),
  });

  const { status } = await (
    await prepareWithdrawAndTransferFees({
      contractAddress,
    })
  )();
  expect(status).toEqual('success');
});

test('Withdraw All', async ({ contractAddress }: TSubscriptionTestContext) => {
  await helpers.mint({
    contractAddress,
    amount: parseEther('1'),
  });

  const { status } = await (
    await prepareWithdrawAndTransferFees({
      contractAddress,
    })
  )();
  expect(status).toEqual('success');
});

test('Update Metadata', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareUpdateMetadata({
      contractAddress: contractAddress,
      contractUri: 'https://meow.com/contract',
      tokenUri: 'https://meow.com/token',
    })
  )();

  expect(status).toEqual('success');

  const state = await fetchCollectionState({
    contractAddress,
  });

  expect(state.contractURI).toEqual('https://meow.com/contract');
  expect(state.tokenUri).toEqual('https://meow.com/token');
});

test('Pause and Unpause', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await preparePause({
      contractAddress: contractAddress,
    })
  )();

  expect(status).toEqual('success');

  let state = await fetchCollectionState({
    contractAddress,
  });

  expect(state.isPaused).toEqual(true);

  const { status: unpauseStatus } = await (
    await prepareUnpause({
      contractAddress: contractAddress,
    })
  )();

  expect(unpauseStatus).toEqual('success');

  state = await fetchCollectionState({
    contractAddress,
  });

  expect(state.isPaused).toEqual(false);
});

test('Grant Time', async ({ contractAddress }: TSubscriptionTestContext) => {
  const accounts: `0x${string}`[] = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92264',
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265',
  ];
  const { status } = await (
    await prepareGrantTime({
      contractAddress,
      numSeconds: 86400n,
      accounts,
    })
  )();
  expect(status).toEqual('success');
  for (let i = 0; i < accounts.length; i++) {
    const holder = await fetchSubscriberState({
      contractAddress,
      account: accounts[i],
    });
    expect(holder.tokenId).toEqual(BigInt(i + 1));
    expect(holder.expiresAt.getTime()).toBeGreaterThanOrEqual(
      Date.now() + 86400 * 1000 - 5000,
    );
  }
});

test('Refund Accounts', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const accounts: `0x${string}`[] = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92264',
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265',
  ];
  await (
    await prepareGrantTime({
      contractAddress,
      numSeconds: 86400n,
      accounts,
    })
  )();

  const { status } = await (
    await prepareRefund({
      contractAddress,
      accounts,
    })
  )();
  expect(status).toEqual('success');

  for (let i = 0; i < accounts.length; i++) {
    const holder = await fetchSubscriberState({
      contractAddress,
      account: accounts[i],
    });
    expect(holder.expiresAt.getTime()).toBeLessThanOrEqual(Date.now() + 60000);
  }
});

test('Referrals + Mint', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  await (
    await prepareCreateReferralCode({
      contractAddress,
      referralCode: 1n,
      bps: 250,
    })
  )();

  const { status } = await (
    await prepareMintWithReferral({
      contractAddress,
      referralCode: 1n,
      amount: 120000n,
      referrer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92264',
    })
  )();
  expect(status).toEqual('success');

  const { status: mintForStatus } = await (
    await prepareMintWithReferralFor({
      contractAddress,
      referralCode: 1n,
      amount: 120000n,
      account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92261',
      referrer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92264',
    })
  )();
  expect(mintForStatus).toEqual('success');

  const { status: deleteStatus } = await (
    await prepareDeleteReferralCode({
      contractAddress,
      referralCode: 1n,
    })
  )();
  expect(deleteStatus).toEqual('success');
});

test('Transfer Ownership', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareTransferOwnership({
      contractAddress,
      newOwner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92261',
    })
  )();
  expect(status).toEqual('success');
});

test('Set supply cap', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareSetSupplyCap({
      contractAddress,
      supplyCap: 1n,
    })
  )();
  expect(status).toEqual('success');
});

test('Set transfer recipient and transfer', async ({
  contractAddress,
}: TSubscriptionTestContext) => {
  const { status } = await (
    await prepareSetTransferRecipient({
      contractAddress,
      recipient: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    })
  )();
  expect(status).toEqual('success');

  const { status: transferStatus } = await (
    await prepareTransferAllBalances({
      contractAddress,
    })
  )();

  expect(transferStatus).toEqual('success');
});

test('Withdraw rewards', async () => {
  const config: CollectionConfig = {
    name: 'Test',
    symbol: 'TEST',
    contractURI: 'https://example.com/contract',
    tokenURI: 'https://example.com/token',
    tokensPerSecond: 1n,
    minPurchaseSeconds: 60n,
    subscriberRewardBps: 500,
  };

  const { contractAddress } = await (await prepareDeployment(config))();

  await helpers.mint({
    contractAddress,
    amount: 100n,
  });

  await (
    await prepareWithdrawAndTransferFees({
      contractAddress,
    })
  )();

  const { status } = await (
    await prepareWithdrawRewards({
      contractAddress,
    })
  )();

  expect(status).toEqual('success');
});
