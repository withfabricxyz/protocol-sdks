import { test, expect, beforeEach } from 'vitest';
import { fetchReceipt } from './utils.js';
import { setupMockConfig } from './_test/utils.js';
import { connect } from '@wagmi/core';

beforeEach(async () => {
  const wagmiConfig = setupMockConfig();
  await connect({
    connector: wagmiConfig.connectors[0],
  });
});

test('not found', async () => {
  const receipt = await fetchReceipt(
    '0xef5058faad266b32b3448f52695627512b5ebb11afd503f3e55a9473b323af09',
  );
  expect(receipt).toBe(null);
});
