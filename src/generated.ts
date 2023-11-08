import {
  getContract,
  GetContractArgs,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  WriteContractMode,
} from '@wagmi/core'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CrowdFinancingV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const crowdFinancingV1ABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Contribution',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Fail' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Payout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferContributions',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'numTokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'contributeERC20',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'contributeEth',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'contributionRangeFor',
    outputs: [
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'endsAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc20Address',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeRecipientAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'goalMax',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'goalMin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'minGoal', internalType: 'uint256', type: 'uint256' },
      { name: 'maxGoal', internalType: 'uint256', type: 'uint256' },
      { name: 'minContribution', internalType: 'uint256', type: 'uint256' },
      { name: 'maxContribution', internalType: 'uint256', type: 'uint256' },
      { name: 'startTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'endTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'erc20TokenAddr', internalType: 'address', type: 'address' },
      { name: 'feeRecipientAddr', internalType: 'address', type: 'address' },
      { name: 'feeTransferBips', internalType: 'uint16', type: 'uint16' },
      { name: 'feeYieldBips', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isContributionAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isEnded',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isEthDenominated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isGoalMaxMet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isGoalMinMet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isStarted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isTransferAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isUnlockAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isWithdrawAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxAllowedContribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minAllowedContribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'recipientAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'startsAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [
      { name: '', internalType: 'enum CrowdFinancingV1.State', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferBalanceToRecipient',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'transferFeeBips',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unlockFailedFunds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'withdrawsOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'yieldBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'yieldERC20',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'yieldEth',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'yieldFeeBips',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'yieldTotal',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'yieldTotalOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CrowdFinancingV1Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const crowdFinancingV1FactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DeployFeeChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DeployFeeTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'deployment',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Deployment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeCollector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'upfrontBips',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'payoutBips',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'FeeScheduleChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'minGoal', internalType: 'uint256', type: 'uint256' },
      { name: 'maxGoal', internalType: 'uint256', type: 'uint256' },
      { name: 'minContribution', internalType: 'uint256', type: 'uint256' },
      { name: 'maxContribution', internalType: 'uint256', type: 'uint256' },
      { name: 'holdOff', internalType: 'uint32', type: 'uint32' },
      { name: 'duration', internalType: 'uint32', type: 'uint32' },
      { name: 'erc20TokenAddr', internalType: 'address', type: 'address' },
    ],
    name: 'deployCampaign',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeSchedule',
    outputs: [
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'transferFee', internalType: 'uint16', type: 'uint16' },
      { name: 'yieldFee', internalType: 'uint16', type: 'uint16' },
      { name: 'deployFee', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'transferDeployFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'feeCollector', internalType: 'address', type: 'address' },
      { name: 'feeTransferBips', internalType: 'uint16', type: 'uint16' },
      { name: 'feeYieldBips', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'updateFeeSchedule',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'minFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateMinimumDeployFee',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const crowdFinancingV1FactoryAddress = {
  1: '0x8e78D80599197C501353453f73B0B92A402077d6',
  10: '0x19eaD00ce8961cfFca0551244DC07D87e6Ff8F7E',
  137: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
  8453: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
  42161: '0x24379629781d03a0Fe67D9712FD2d76a92EfEF14',
  7777777: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
  11155111: '0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const crowdFinancingV1FactoryConfig = {
  address: crowdFinancingV1FactoryAddress,
  abi: crowdFinancingV1FactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20TokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SubscriptionTokenV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const subscriptionTokenV1ABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeeAllocated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'FeeCollectorChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokensTransferred',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeeTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'secondsGranted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'expiresAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Grant',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokensTransferred',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timePurchased',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rewardPoints',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'expiresAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Purchase',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'rewardBps',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'ReferralCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ReferralDestroyed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'referralId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ReferralPayout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokensTransferred',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timeReclaimed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Refund',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokensIn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RefundTopUp',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'slasher',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewardPointsSlashed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardPointsSlashed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokensTransferred',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokens',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsAllocated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'supplyCap',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SupplyCapChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransferRecipientChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokensTransferred',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseTokenURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'canRefund',
    outputs: [{ name: 'refundable', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'code', internalType: 'uint256', type: 'uint256' },
      { name: 'bps', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'createReferralCode',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'creatorBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'code', internalType: 'uint256', type: 'uint256' }],
    name: 'deleteReferralCode',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc20Address',
    outputs: [{ name: 'erc20', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeSchedule',
    outputs: [
      { name: 'feeCollector', internalType: 'address', type: 'address' },
      { name: 'feeBps', internalType: 'uint16', type: 'uint16' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'secondsToAdd', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantTime',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct Shared.InitParams',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'contractUri', internalType: 'string', type: 'string' },
          { name: 'tokenUri', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'tokensPerSecond', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minimumPurchaseSeconds',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'rewardBps', internalType: 'uint16', type: 'uint16' },
          { name: 'numRewardHalvings', internalType: 'uint8', type: 'uint8' },
          { name: 'feeBps', internalType: 'uint16', type: 'uint16' },
          { name: 'feeRecipient', internalType: 'address', type: 'address' },
          { name: 'erc20TokenAddr', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minPurchaseSeconds',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintFor',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' },
      { name: 'referrer', internalType: 'address', type: 'address' },
    ],
    name: 'mintWithReferral',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' },
      { name: 'referrer', internalType: 'address', type: 'address' },
    ],
    name: 'mintWithReferralFor',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'reconcileERC20Balance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'reconcileNativeBalance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'recipientAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recoverERC20',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'recoverNativeTokens',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'code', internalType: 'uint256', type: 'uint256' }],
    name: 'referralCodeBps',
    outputs: [{ name: 'bps', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'numTokensIn', internalType: 'uint256', type: 'uint256' },
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'refund',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'refundableBalanceOf',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'refundableTokenBalanceOfAll',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'rewardBalanceOf',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardBps',
    outputs: [{ name: 'bps', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardMultiplier',
    outputs: [{ name: 'multiplier', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardPoolBalance',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'supplyCap', internalType: 'uint256', type: 'uint256' }],
    name: 'setSupplyCap',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'setTransferRecipient',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'slashRewards',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'subscriptionOf',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'refundableAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardPoints', internalType: 'uint256', type: 'uint256' },
      { name: 'expiresAt', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'supplyDetail',
    outputs: [
      { name: 'count', internalType: 'uint256', type: 'uint256' },
      { name: 'cap', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    name: 'timeValue',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalCreatorEarnings',
    outputs: [{ name: 'total', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalRewardPoints',
    outputs: [{ name: 'numPoints', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tps',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferAllBalances',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'transferFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'transferRecipient',
    outputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newCollector', internalType: 'address', type: 'address' },
    ],
    name: 'updateFeeRecipient',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'contractUri', internalType: 'string', type: 'string' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetadata',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawAndTransferFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdrawRewards',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'withdrawTo',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SubscriptionTokenV1Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DeployFeeChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DeployFeeTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'deployment',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'feeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deployment',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'collector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'bips', internalType: 'uint16', type: 'uint16', indexed: false },
    ],
    name: 'FeeCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'FeeDestroyed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'bips', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'createFee',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'contractURI', internalType: 'string', type: 'string' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
      { name: 'tokensPerSecond', internalType: 'uint256', type: 'uint256' },
      {
        name: 'minimumPurchaseSeconds',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'rewardBps', internalType: 'uint16', type: 'uint16' },
      { name: 'erc20TokenAddr', internalType: 'address', type: 'address' },
      { name: 'feeConfigId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deploySubscription',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'destroyFee',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'feeId', internalType: 'uint256', type: 'uint256' }],
    name: 'feeInfo',
    outputs: [
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'bips', internalType: 'uint16', type: 'uint16' },
      { name: 'deployFeeWei', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'transferDeployFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'minFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateMinimumDeployFee',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryAddress = {
  1: '0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6',
  5: '0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1',
  10: '0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A',
  8453: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
  17000: '0xD0884D249B74B7E6C433bB4130a9d3FCa309170E',
  11155111: '0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryConfig = {
  address: subscriptionTokenV1FactoryAddress,
  abi: subscriptionTokenV1FactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link crowdFinancingV1ABI}__.
 */
export function getCrowdFinancingV1(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: crowdFinancingV1ABI, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1ABI}__.
 */
export function writeCrowdFinancingV1<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof crowdFinancingV1ABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof crowdFinancingV1ABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: crowdFinancingV1ABI,
    ...config,
  } as unknown as WriteContractArgs<typeof crowdFinancingV1ABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link crowdFinancingV1ABI}__.
 */
export function prepareWriteCrowdFinancingV1<
  TAbi extends readonly unknown[] = typeof crowdFinancingV1ABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: crowdFinancingV1ABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link crowdFinancingV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export function getCrowdFinancingV1Factory(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof crowdFinancingV1FactoryAddress
  },
) {
  return getContract({
    abi: crowdFinancingV1FactoryABI,
    address:
      crowdFinancingV1FactoryAddress[
        config.chainId as keyof typeof crowdFinancingV1FactoryAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export function writeCrowdFinancingV1Factory<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof crowdFinancingV1FactoryAddress,
>(
  config:
    | (Omit<
        WriteContractPreparedArgs<
          typeof crowdFinancingV1FactoryABI,
          TFunctionName
        >,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof crowdFinancingV1FactoryAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<
          typeof crowdFinancingV1FactoryABI,
          TFunctionName
        >,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof crowdFinancingV1FactoryAddress
      }),
) {
  return writeContract({
    abi: crowdFinancingV1FactoryABI,
    address:
      crowdFinancingV1FactoryAddress[
        config.chainId as keyof typeof crowdFinancingV1FactoryAddress
      ],
    ...config,
  } as unknown as WriteContractArgs<
    typeof crowdFinancingV1FactoryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link crowdFinancingV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export function prepareWriteCrowdFinancingV1Factory<
  TAbi extends readonly unknown[] = typeof crowdFinancingV1FactoryABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof crowdFinancingV1FactoryAddress },
) {
  return prepareWriteContract({
    abi: crowdFinancingV1FactoryABI,
    address:
      crowdFinancingV1FactoryAddress[
        config.chainId as keyof typeof crowdFinancingV1FactoryAddress
      ],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link erc20TokenABI}__.
 */
export function getErc20Token(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: erc20TokenABI, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenABI}__.
 */
export function writeErc20Token<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof erc20TokenABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof erc20TokenABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: erc20TokenABI,
    ...config,
  } as unknown as WriteContractArgs<typeof erc20TokenABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link erc20TokenABI}__.
 */
export function prepareWriteErc20Token<
  TAbi extends readonly unknown[] = typeof erc20TokenABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: erc20TokenABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link subscriptionTokenV1ABI}__.
 */
export function getSubscriptionTokenV1(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: subscriptionTokenV1ABI, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1ABI}__.
 */
export function writeSubscriptionTokenV1<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof subscriptionTokenV1ABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<
          typeof subscriptionTokenV1ABI,
          TFunctionName
        >,
        'abi'
      >,
) {
  return writeContract({
    abi: subscriptionTokenV1ABI,
    ...config,
  } as unknown as WriteContractArgs<
    typeof subscriptionTokenV1ABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link subscriptionTokenV1ABI}__.
 */
export function prepareWriteSubscriptionTokenV1<
  TAbi extends readonly unknown[] = typeof subscriptionTokenV1ABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: subscriptionTokenV1ABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export function getSubscriptionTokenV1Factory(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof subscriptionTokenV1FactoryAddress
  },
) {
  return getContract({
    abi: subscriptionTokenV1FactoryABI,
    address:
      subscriptionTokenV1FactoryAddress[
        config.chainId as keyof typeof subscriptionTokenV1FactoryAddress
      ],
    ...config,
  })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export function writeSubscriptionTokenV1Factory<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof subscriptionTokenV1FactoryAddress,
>(
  config:
    | (Omit<
        WriteContractPreparedArgs<
          typeof subscriptionTokenV1FactoryABI,
          TFunctionName
        >,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof subscriptionTokenV1FactoryAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<
          typeof subscriptionTokenV1FactoryABI,
          TFunctionName
        >,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof subscriptionTokenV1FactoryAddress
      }),
) {
  return writeContract({
    abi: subscriptionTokenV1FactoryABI,
    address:
      subscriptionTokenV1FactoryAddress[
        config.chainId as keyof typeof subscriptionTokenV1FactoryAddress
      ],
    ...config,
  } as unknown as WriteContractArgs<
    typeof subscriptionTokenV1FactoryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://explorer.optimism.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * -
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export function prepareWriteSubscriptionTokenV1Factory<
  TAbi extends readonly unknown[] = typeof subscriptionTokenV1FactoryABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof subscriptionTokenV1FactoryAddress },
) {
  return prepareWriteContract({
    abi: subscriptionTokenV1FactoryABI,
    address:
      subscriptionTokenV1FactoryAddress[
        config.chainId as keyof typeof subscriptionTokenV1FactoryAddress
      ],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}
