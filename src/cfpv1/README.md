# CFPv1 - Crowd Financing Protocol SDK

![CFPv1 Flow Diagram](https://user-images.githubusercontent.com/587795/228884313-dacb8912-f6a1-40e1-bd18-03085a71f97f.png)

[High Level Overview](https://docs.withfabric.xyz/crowdfi/overview)

### Basic Usage

All examples assume wagmi/wagmi-core is configured in your application.

#### Deploying a Campaign

```ts
import { parseEther, zeroAddress } from 'viem';
import { CampaignConfig, prepareCampaignDeployment } from '@withfabric/protocol-sdks';

const config : CampaignConfig = {
  recipientAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Where the eth transfers on success
  minGoal: parseEther('1'), // The minimum raise amount for success
  maxGoal: parseEther('1.25'), // The maximum raise amount
  minContribution: parseEther('0.01'), // The minimum amount a contributor can contribute
  maxContribution: parseEther('1.25'), // The maximum amount a contributor can contribute
  holdOffSeconds: 60, // Start in 60 seconds
  durationSeconds: 60 * 60 * 24 * 7, // Run for 7 Days
  erc20TokenAddress: zeroAddress, // Native token (ETH)
};

// Returns a closure which will execute the transaction upon calling
const preparedDeployment = await prepareCampaignDeployment(config);

// Returns a receipt and the campaign address
const { campaignAddress, receipt } = await preparedDeployment();

if(receipt.status !== 'success') {
  throw new Error('Failed to deploy campaign');
}
```

#### Interacting with a Campaign

The SDK provides a context object which operates within the scope of an account and campaign contract. First build
a context object

```ts
import { fetchCampaignAccountContext } from '@withfabric/protocol-sdks';
import { getAccount } from '@wagmi/core';

const campaignAddress = '0x...';
const account = getAccount().address!;

const context = await fetchCampaignAccountContext({ campaignAddress, account });
```

Once you have context... contributing, withdrawing, etc. are done through the object using
a preflight, prepare, execute pattern. This pattern is opinionated, but has the following benefits:

1. Simulates transactions to estimate gas and ensure the txn is possible
2. Defers execution after preparation to prevent mobile UX issues when deep linking

#### General Pattern (Applies to all actions)

```ts
const numTokens = parseEther('0.1');

// Quick check to see if it's allowed (no onchain calls)
context.isContributionPossible(numTokens);

// Reasons why it's not possible
context.getContributePreflightResults(numTokens);

// First checks if it's possible using local state, then simulates the transaction onchain
// and prepares the final transaction for execution. This will throw an error if the preflight
// checks fail, or the simulation fails.
await context.prepareContribution(numTokens);

// Signs and sends the prepare contribution txn via wallet. This should happen
// immediately after a tap on mobile to prevent a prompt or app store redirect
const receipt = await context.executeContribution();
```

#### Contributing to a Campaign

```ts
const contributionAmount = parseEther('0.1');

// If the campaign is ERC-20 denominated, check the approved amount for the campaign
if (context.isTokenApprovalRequired(contribution)) {
  await context.prepareTokenApproval(contribution);
  await context.executeTokenApproval();
}

await context.prepareContribution(contribution);
const receipt = await context.executeContribution();
```

#### Withdrawing

```ts
await context.prepareWithdraw();
const receipt = await context.executeWithdraw();
```

#### Transferring Goal Balance

```ts
await context.prepareTransfer();
const receipt = await context.executeTransfer();
```

#### Yielding

If the campaign is successful, any funds yielded back to the contract are split, pro-rata, for all
contributors. Those contributors can then withdraw those tokens.

```ts
const yieldAmount = parseEther('0.5');

// If the campaign is ERC-20 denominated, check the approved amount for the campaign
if (context.isTokenApprovalRequired(contribution)) {
  await context.prepareTokenApproval(contribution);
  await context.executeTokenApproval();
}

await context.prepareYield(yieldAmount); // Could throw
const receipt = await context.executeYield();
```

#### Refreshing Context

After transacting with the contract, you may want to display updated
state from the context object. The refresh method will return a new context
object with updated state from chain state.

```ts
context = context.refresh();
```

### Alternative Approach

If you prefer not to leverage context, there are functions to perform all actions.

[See campaign.ts](campaign.ts)

```ts
const prepared = await prepareCampaignContribution({
  campaignAddress: '0x0...0',
  amount: 100000n,
});
const receipt = await prepared();
```