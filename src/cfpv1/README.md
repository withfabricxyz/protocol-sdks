# CFPv1 - Crowd Financing Protocol SDK

![CFPv1 Flow Diagram](https://user-images.githubusercontent.com/587795/228884313-dacb8912-f6a1-40e1-bd18-03085a71f97f.png)

[High Level Overview](https://docs.withfabric.xyz/crowdfi/overview)

### Basic Usage

All examples assume wagmi is configured in your application.

#### Contributing to a Campaign

```ts
import { fetchCampaignAccountContext } from '@withfabric/protocol-sdks';
import { getAccount } from '@wagmi/core';

const campaignAddress = '0x...';
const account = getAccount().address!;

// Fetch state and account status for a given CFPv1 Campaign
const context = await fetchCampaignAccountContext({ campaignAddress, account });

// The amount of base tokens (wei, etc) to contribute. For example, 1ETH = 10 ** 18 wei
const contribution = 10000000n;

if(!context.isContributionPossible(contribution)) {
  throw new Error('No can do buckaroo ' + context.getContributePreflightResults(contribution).join(', '));
}

// ERC-20 based campaigns require approval, if and only if the approved amount < contribution
if (context.isTokenApprovalRequired(contribution)) {
  // All operations work as prepare + execute to avoid UX pitfalls with mobile wallets
  await context.prepareTokenApproval(contribution);

  // Execute the approval and return TransactionReceipt
  const approvalReceipt = await context.executeTokenApproval();
}

// Prepare the contribution call itself
await context.prepareContribution(contribution);

// Execute the contribution and return TransactionReceipt
const receipt = await context.executeContribution();
```

#### Deploying a Campaign

This assumes a connected account on a supported chain.

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
  throw new Error('Failed to deploy campaign);
}

// ...
```
