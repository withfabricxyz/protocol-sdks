import { test, expect, beforeEach } from 'vitest';
import { fetchReceipt } from './utils.js';
import { wagmiTestSetup } from './_test/utils.js';

beforeEach(async () => {
  await wagmiTestSetup();
});

test('not found', async () => {
  const receipt = await fetchReceipt(
    '0xef5058faad266b32b3448f52695627512b5ebb11afd503f3e55a9473b323af09',
  );
  expect(receipt).toBe(null);
});
