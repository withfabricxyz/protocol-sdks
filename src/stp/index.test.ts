import { beforeAll, expect, test } from 'vitest';
import { prepareDeployment } from '../stpv1/factory.js';
import { prepareDeployment as prepareV2Deployment } from '../stpv2/factory.js';
import {
  deploySubscriptionNFTContracts,
  deploySubscriptionNFTV2Contracts,
  stpV1DeployParams,
  stpV2DeployParams,
  wagmiTestSetup,
} from '../_test/utils.js';
import { configureFabricSDK } from '../config/index.js';
import { resolveSTPVersion } from './index.js';

beforeAll(async () => {
  await wagmiTestSetup();
  const { factoryAddress: v1fac } = await deploySubscriptionNFTContracts();
  const { factoryAddress: v2fac } = await deploySubscriptionNFTV2Contracts();
  configureFabricSDK({
    stpv1: {
      factories: { 1: v1fac },
    },
    stpv2: {
      factories: { 1: v2fac },
    },
  });
});

test('Loads the correct context', async () => {
  const v1deployment = await (await prepareDeployment(stpV1DeployParams()))();
  const v2deployment = await (await prepareV2Deployment(stpV2DeployParams()))();

  expect(
    await resolveSTPVersion({ contractAddress: v1deployment.contractAddress }),
  ).toEqual(1);
  expect(
    await resolveSTPVersion({ contractAddress: v2deployment.contractAddress }),
  ).toEqual(2);
});
