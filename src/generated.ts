import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from '@wagmi/core/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CrowdFinancingV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const crowdFinancingV1Abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'contributeERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contributeEth',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'contributionRangeFor',
    outputs: [
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endsAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc20Address',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeRecipientAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'goalMax',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'goalMin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isContributionAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEnded',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEthDenominated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isGoalMaxMet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isGoalMinMet',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isStarted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isTransferAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isUnlockAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isWithdrawAllowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxAllowedContribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minAllowedContribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'recipientAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startsAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [
      { name: '', internalType: 'enum CrowdFinancingV1.State', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferBalanceToRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferFeeBips',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockFailedFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'withdrawsOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'yieldBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'yieldERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldEth',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldFeeBips',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldTotal',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'yieldTotalOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CrowdFinancingV1Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const crowdFinancingV1FactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeSchedule',
    outputs: [
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'transferFee', internalType: 'uint16', type: 'uint16' },
      { name: 'yieldFee', internalType: 'uint16', type: 'uint16' },
      { name: 'deployFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'transferDeployFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'feeCollector', internalType: 'address', type: 'address' },
      { name: 'feeTransferBips', internalType: 'uint16', type: 'uint16' },
      { name: 'feeYieldBips', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'updateFeeSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'minFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateMinimumDeployFee',
    outputs: [],
    stateMutability: 'nonpayable',
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
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
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
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const crowdFinancingV1FactoryConfig = {
  address: crowdFinancingV1FactoryAddress,
  abi: crowdFinancingV1FactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20TokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SubscriptionTokenV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const subscriptionTokenV1Abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseTokenURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'canRefund',
    outputs: [{ name: 'refundable', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'code', internalType: 'uint256', type: 'uint256' },
      { name: 'bps', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'createReferralCode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'creatorBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'code', internalType: 'uint256', type: 'uint256' }],
    name: 'deleteReferralCode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc20Address',
    outputs: [{ name: 'erc20', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeSchedule',
    outputs: [
      { name: 'feeCollector', internalType: 'address', type: 'address' },
      { name: 'feeBps', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'secondsToAdd', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minPurchaseSeconds',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintFor',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' },
      { name: 'referrer', internalType: 'address', type: 'address' },
    ],
    name: 'mintWithReferral',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'numTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'referralCode', internalType: 'uint256', type: 'uint256' },
      { name: 'referrer', internalType: 'address', type: 'address' },
    ],
    name: 'mintWithReferralFor',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reconcileERC20Balance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reconcileNativeBalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'recipientAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'recoverNativeTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'code', internalType: 'uint256', type: 'uint256' }],
    name: 'referralCodeBps',
    outputs: [{ name: 'bps', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numTokensIn', internalType: 'uint256', type: 'uint256' },
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'refund',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'refundableBalanceOf',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'refundableTokenBalanceOfAll',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'rewardBalanceOf',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardBps',
    outputs: [{ name: 'bps', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardMultiplier',
    outputs: [{ name: 'multiplier', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPoolBalance',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'supplyCap', internalType: 'uint256', type: 'uint256' }],
    name: 'setSupplyCap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'setTransferRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'slashRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'subscriptionOf',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'refundableAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardPoints', internalType: 'uint256', type: 'uint256' },
      { name: 'expiresAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supplyDetail',
    outputs: [
      { name: 'count', internalType: 'uint256', type: 'uint256' },
      { name: 'cap', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    name: 'timeValue',
    outputs: [{ name: 'numSeconds', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalCreatorEarnings',
    outputs: [{ name: 'total', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalRewardPoints',
    outputs: [{ name: 'numPoints', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tps',
    outputs: [{ name: 'numTokens', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferAllBalances',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferRecipient',
    outputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newCollector', internalType: 'address', type: 'address' },
    ],
    name: 'updateFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractUri', internalType: 'string', type: 'string' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawAndTransferFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SubscriptionTokenV1Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'bips', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'createFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
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
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'destroyFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'feeId', internalType: 'uint256', type: 'uint256' }],
    name: 'feeInfo',
    outputs: [
      { name: 'collector', internalType: 'address', type: 'address' },
      { name: 'bips', internalType: 'uint16', type: 'uint16' },
      { name: 'deployFeeWei', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'transferDeployFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'minFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateMinimumDeployFee',
    outputs: [],
    stateMutability: 'nonpayable',
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
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryAddress = {
  1: '0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6',
  5: '0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1',
  10: '0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A',
  8453: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
  17000: '0xD0884D249B74B7E6C433bB4130a9d3FCa309170E',
  7777777: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
  11155111: '0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const subscriptionTokenV1FactoryConfig = {
  address: subscriptionTokenV1FactoryAddress,
  abi: subscriptionTokenV1FactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__
 */
export const readCrowdFinancingV1 = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"allowance"`
 */
export const readCrowdFinancingV1Allowance = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readCrowdFinancingV1BalanceOf = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"contributionRangeFor"`
 */
export const readCrowdFinancingV1ContributionRangeFor =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'contributionRangeFor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"endsAt"`
 */
export const readCrowdFinancingV1EndsAt = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'endsAt',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"erc20Address"`
 */
export const readCrowdFinancingV1Erc20Address =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'erc20Address',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"feeRecipientAddress"`
 */
export const readCrowdFinancingV1FeeRecipientAddress =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'feeRecipientAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"goalMax"`
 */
export const readCrowdFinancingV1GoalMax = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'goalMax',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"goalMin"`
 */
export const readCrowdFinancingV1GoalMin = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'goalMin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isContributionAllowed"`
 */
export const readCrowdFinancingV1IsContributionAllowed =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isContributionAllowed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isEnded"`
 */
export const readCrowdFinancingV1IsEnded = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'isEnded',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isEthDenominated"`
 */
export const readCrowdFinancingV1IsEthDenominated =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isEthDenominated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isGoalMaxMet"`
 */
export const readCrowdFinancingV1IsGoalMaxMet =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isGoalMaxMet',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isGoalMinMet"`
 */
export const readCrowdFinancingV1IsGoalMinMet =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isGoalMinMet',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isStarted"`
 */
export const readCrowdFinancingV1IsStarted = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'isStarted',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isTransferAllowed"`
 */
export const readCrowdFinancingV1IsTransferAllowed =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isTransferAllowed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isUnlockAllowed"`
 */
export const readCrowdFinancingV1IsUnlockAllowed =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isUnlockAllowed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"isWithdrawAllowed"`
 */
export const readCrowdFinancingV1IsWithdrawAllowed =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'isWithdrawAllowed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"maxAllowedContribution"`
 */
export const readCrowdFinancingV1MaxAllowedContribution =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'maxAllowedContribution',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"minAllowedContribution"`
 */
export const readCrowdFinancingV1MinAllowedContribution =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'minAllowedContribution',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"recipientAddress"`
 */
export const readCrowdFinancingV1RecipientAddress =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'recipientAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"startsAt"`
 */
export const readCrowdFinancingV1StartsAt = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'startsAt',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"state"`
 */
export const readCrowdFinancingV1State = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'state',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readCrowdFinancingV1TotalSupply = /*#__PURE__*/ createReadContract(
  { abi: crowdFinancingV1Abi, functionName: 'totalSupply' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transferFeeBips"`
 */
export const readCrowdFinancingV1TransferFeeBips =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transferFeeBips',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"withdrawsOf"`
 */
export const readCrowdFinancingV1WithdrawsOf = /*#__PURE__*/ createReadContract(
  { abi: crowdFinancingV1Abi, functionName: 'withdrawsOf' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldBalanceOf"`
 */
export const readCrowdFinancingV1YieldBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldBalanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldFeeBips"`
 */
export const readCrowdFinancingV1YieldFeeBips =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldFeeBips',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldTotal"`
 */
export const readCrowdFinancingV1YieldTotal = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1Abi,
  functionName: 'yieldTotal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldTotalOf"`
 */
export const readCrowdFinancingV1YieldTotalOf =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldTotalOf',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__
 */
export const writeCrowdFinancingV1 = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"approve"`
 */
export const writeCrowdFinancingV1Approve = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"contributeERC20"`
 */
export const writeCrowdFinancingV1ContributeErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'contributeERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"contributeEth"`
 */
export const writeCrowdFinancingV1ContributeEth =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'contributeEth',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const writeCrowdFinancingV1DecreaseAllowance =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const writeCrowdFinancingV1IncreaseAllowance =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"initialize"`
 */
export const writeCrowdFinancingV1Initialize =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transfer"`
 */
export const writeCrowdFinancingV1Transfer = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transferBalanceToRecipient"`
 */
export const writeCrowdFinancingV1TransferBalanceToRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transferBalanceToRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeCrowdFinancingV1TransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"unlockFailedFunds"`
 */
export const writeCrowdFinancingV1UnlockFailedFunds =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'unlockFailedFunds',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"withdraw"`
 */
export const writeCrowdFinancingV1Withdraw = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1Abi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldERC20"`
 */
export const writeCrowdFinancingV1YieldErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldEth"`
 */
export const writeCrowdFinancingV1YieldEth = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1Abi,
  functionName: 'yieldEth',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__
 */
export const simulateCrowdFinancingV1 = /*#__PURE__*/ createSimulateContract({
  abi: crowdFinancingV1Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"approve"`
 */
export const simulateCrowdFinancingV1Approve =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"contributeERC20"`
 */
export const simulateCrowdFinancingV1ContributeErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'contributeERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"contributeEth"`
 */
export const simulateCrowdFinancingV1ContributeEth =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'contributeEth',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const simulateCrowdFinancingV1DecreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const simulateCrowdFinancingV1IncreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"initialize"`
 */
export const simulateCrowdFinancingV1Initialize =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateCrowdFinancingV1Transfer =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transferBalanceToRecipient"`
 */
export const simulateCrowdFinancingV1TransferBalanceToRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transferBalanceToRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateCrowdFinancingV1TransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"unlockFailedFunds"`
 */
export const simulateCrowdFinancingV1UnlockFailedFunds =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'unlockFailedFunds',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"withdraw"`
 */
export const simulateCrowdFinancingV1Withdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldERC20"`
 */
export const simulateCrowdFinancingV1YieldErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `functionName` set to `"yieldEth"`
 */
export const simulateCrowdFinancingV1YieldEth =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1Abi,
    functionName: 'yieldEth',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__
 */
export const watchCrowdFinancingV1Event =
  /*#__PURE__*/ createWatchContractEvent({ abi: crowdFinancingV1Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Approval"`
 */
export const watchCrowdFinancingV1ApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Contribution"`
 */
export const watchCrowdFinancingV1ContributionEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Contribution',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Fail"`
 */
export const watchCrowdFinancingV1FailEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Fail',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Initialized"`
 */
export const watchCrowdFinancingV1InitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Payout"`
 */
export const watchCrowdFinancingV1PayoutEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Payout',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchCrowdFinancingV1TransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"TransferContributions"`
 */
export const watchCrowdFinancingV1TransferContributionsEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'TransferContributions',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1Abi}__ and `eventName` set to `"Withdraw"`
 */
export const watchCrowdFinancingV1WithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1Abi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const readCrowdFinancingV1Factory = /*#__PURE__*/ createReadContract({
  abi: crowdFinancingV1FactoryAbi,
  address: crowdFinancingV1FactoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"feeSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const readCrowdFinancingV1FactoryFeeSchedule =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'feeSchedule',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const readCrowdFinancingV1FactoryOwner =
  /*#__PURE__*/ createReadContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1Factory = /*#__PURE__*/ createWriteContract({
  abi: crowdFinancingV1FactoryAbi,
  address: crowdFinancingV1FactoryAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"deployCampaign"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryDeployCampaign =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'deployCampaign',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"transferDeployFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryTransferDeployFees =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'transferDeployFees',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"updateFeeSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryUpdateFeeSchedule =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'updateFeeSchedule',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"updateMinimumDeployFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const writeCrowdFinancingV1FactoryUpdateMinimumDeployFee =
  /*#__PURE__*/ createWriteContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'updateMinimumDeployFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1Factory =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"deployCampaign"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryDeployCampaign =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'deployCampaign',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"transferDeployFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryTransferDeployFees =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'transferDeployFees',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"updateFeeSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryUpdateFeeSchedule =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'updateFeeSchedule',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `functionName` set to `"updateMinimumDeployFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const simulateCrowdFinancingV1FactoryUpdateMinimumDeployFee =
  /*#__PURE__*/ createSimulateContract({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    functionName: 'updateMinimumDeployFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `eventName` set to `"DeployFeeChange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryDeployFeeChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    eventName: 'DeployFeeChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `eventName` set to `"DeployFeeTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryDeployFeeTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    eventName: 'DeployFeeTransfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `eventName` set to `"Deployment"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryDeploymentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    eventName: 'Deployment',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `eventName` set to `"FeeScheduleChange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryFeeScheduleChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    eventName: 'FeeScheduleChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link crowdFinancingV1FactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8e78d80599197c501353453f73b0b92a402077d6)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x19ead00ce8961cffca0551244dc07d87e6ff8f7e)
 * - [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x24379629781d03a0Fe67D9712FD2d76a92EfEF14)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E)
 */
export const watchCrowdFinancingV1FactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: crowdFinancingV1FactoryAbi,
    address: crowdFinancingV1FactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__
 */
export const readErc20Token = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"allowance"`
 */
export const readErc20TokenAllowance = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20TokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"decimals"`
 */
export const readErc20TokenDecimals = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"name"`
 */
export const readErc20TokenName = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"symbol"`
 */
export const readErc20TokenSymbol = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20TokenAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__
 */
export const writeErc20Token = /*#__PURE__*/ createWriteContract({
  abi: erc20TokenAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"approve"`
 */
export const writeErc20TokenApprove = /*#__PURE__*/ createWriteContract({
  abi: erc20TokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const writeErc20TokenDecreaseAllowance =
  /*#__PURE__*/ createWriteContract({
    abi: erc20TokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const writeErc20TokenIncreaseAllowance =
  /*#__PURE__*/ createWriteContract({
    abi: erc20TokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20TokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: erc20TokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20TokenAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__
 */
export const simulateErc20Token = /*#__PURE__*/ createSimulateContract({
  abi: erc20TokenAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20TokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: erc20TokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const simulateErc20TokenDecreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: erc20TokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const simulateErc20TokenIncreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: erc20TokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20TokenTransfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20TokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20TokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TokenTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: erc20TokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20TokenAbi}__
 */
export const watchErc20TokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20TokenAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20TokenAbi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20TokenApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc20TokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20TokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TokenTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc20TokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__
 */
export const readSubscriptionTokenV1 = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readSubscriptionTokenV1BalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"baseTokenURI"`
 */
export const readSubscriptionTokenV1BaseTokenUri =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'baseTokenURI',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"canRefund"`
 */
export const readSubscriptionTokenV1CanRefund =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'canRefund',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"contractURI"`
 */
export const readSubscriptionTokenV1ContractUri =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'contractURI',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"creatorBalance"`
 */
export const readSubscriptionTokenV1CreatorBalance =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'creatorBalance',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"erc20Address"`
 */
export const readSubscriptionTokenV1Erc20Address =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'erc20Address',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"feeBalance"`
 */
export const readSubscriptionTokenV1FeeBalance =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'feeBalance',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"feeSchedule"`
 */
export const readSubscriptionTokenV1FeeSchedule =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'feeSchedule',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"getApproved"`
 */
export const readSubscriptionTokenV1GetApproved =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readSubscriptionTokenV1IsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"minPurchaseSeconds"`
 */
export const readSubscriptionTokenV1MinPurchaseSeconds =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'minPurchaseSeconds',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"name"`
 */
export const readSubscriptionTokenV1Name = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"owner"`
 */
export const readSubscriptionTokenV1Owner = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readSubscriptionTokenV1OwnerOf = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"paused"`
 */
export const readSubscriptionTokenV1Paused = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"pendingOwner"`
 */
export const readSubscriptionTokenV1PendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"referralCodeBps"`
 */
export const readSubscriptionTokenV1ReferralCodeBps =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'referralCodeBps',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"refundableBalanceOf"`
 */
export const readSubscriptionTokenV1RefundableBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'refundableBalanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"refundableTokenBalanceOfAll"`
 */
export const readSubscriptionTokenV1RefundableTokenBalanceOfAll =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'refundableTokenBalanceOfAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"rewardBalanceOf"`
 */
export const readSubscriptionTokenV1RewardBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'rewardBalanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"rewardBps"`
 */
export const readSubscriptionTokenV1RewardBps =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'rewardBps',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"rewardMultiplier"`
 */
export const readSubscriptionTokenV1RewardMultiplier =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'rewardMultiplier',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"rewardPoolBalance"`
 */
export const readSubscriptionTokenV1RewardPoolBalance =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'rewardPoolBalance',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"subscriptionOf"`
 */
export const readSubscriptionTokenV1SubscriptionOf =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'subscriptionOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"supplyDetail"`
 */
export const readSubscriptionTokenV1SupplyDetail =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'supplyDetail',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readSubscriptionTokenV1SupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"symbol"`
 */
export const readSubscriptionTokenV1Symbol = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"timeValue"`
 */
export const readSubscriptionTokenV1TimeValue =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'timeValue',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"tokenURI"`
 */
export const readSubscriptionTokenV1TokenUri = /*#__PURE__*/ createReadContract(
  { abi: subscriptionTokenV1Abi, functionName: 'tokenURI' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"totalCreatorEarnings"`
 */
export const readSubscriptionTokenV1TotalCreatorEarnings =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'totalCreatorEarnings',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"totalRewardPoints"`
 */
export const readSubscriptionTokenV1TotalRewardPoints =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'totalRewardPoints',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"tps"`
 */
export const readSubscriptionTokenV1Tps = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'tps',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferRecipient"`
 */
export const readSubscriptionTokenV1TransferRecipient =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__
 */
export const writeSubscriptionTokenV1 = /*#__PURE__*/ createWriteContract({
  abi: subscriptionTokenV1Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeSubscriptionTokenV1AcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"approve"`
 */
export const writeSubscriptionTokenV1Approve =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"createReferralCode"`
 */
export const writeSubscriptionTokenV1CreateReferralCode =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'createReferralCode',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"deleteReferralCode"`
 */
export const writeSubscriptionTokenV1DeleteReferralCode =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'deleteReferralCode',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"grantTime"`
 */
export const writeSubscriptionTokenV1GrantTime =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'grantTime',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"initialize"`
 */
export const writeSubscriptionTokenV1Initialize =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mint"`
 */
export const writeSubscriptionTokenV1Mint = /*#__PURE__*/ createWriteContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintFor"`
 */
export const writeSubscriptionTokenV1MintFor =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintFor',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintWithReferral"`
 */
export const writeSubscriptionTokenV1MintWithReferral =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintWithReferral',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintWithReferralFor"`
 */
export const writeSubscriptionTokenV1MintWithReferralFor =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintWithReferralFor',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"pause"`
 */
export const writeSubscriptionTokenV1Pause = /*#__PURE__*/ createWriteContract({
  abi: subscriptionTokenV1Abi,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"reconcileERC20Balance"`
 */
export const writeSubscriptionTokenV1ReconcileErc20Balance =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'reconcileERC20Balance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"reconcileNativeBalance"`
 */
export const writeSubscriptionTokenV1ReconcileNativeBalance =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'reconcileNativeBalance',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"recoverERC20"`
 */
export const writeSubscriptionTokenV1RecoverErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'recoverERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"recoverNativeTokens"`
 */
export const writeSubscriptionTokenV1RecoverNativeTokens =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'recoverNativeTokens',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"refund"`
 */
export const writeSubscriptionTokenV1Refund = /*#__PURE__*/ createWriteContract(
  { abi: subscriptionTokenV1Abi, functionName: 'refund' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeSubscriptionTokenV1RenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeSubscriptionTokenV1SafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeSubscriptionTokenV1SetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setSupplyCap"`
 */
export const writeSubscriptionTokenV1SetSupplyCap =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setSupplyCap',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setTransferRecipient"`
 */
export const writeSubscriptionTokenV1SetTransferRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setTransferRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"slashRewards"`
 */
export const writeSubscriptionTokenV1SlashRewards =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'slashRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferAllBalances"`
 */
export const writeSubscriptionTokenV1TransferAllBalances =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferAllBalances',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferFees"`
 */
export const writeSubscriptionTokenV1TransferFees =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferFees',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeSubscriptionTokenV1TransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeSubscriptionTokenV1TransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"unpause"`
 */
export const writeSubscriptionTokenV1Unpause =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"updateFeeRecipient"`
 */
export const writeSubscriptionTokenV1UpdateFeeRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'updateFeeRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"updateMetadata"`
 */
export const writeSubscriptionTokenV1UpdateMetadata =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdraw"`
 */
export const writeSubscriptionTokenV1Withdraw =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawAndTransferFees"`
 */
export const writeSubscriptionTokenV1WithdrawAndTransferFees =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawAndTransferFees',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawRewards"`
 */
export const writeSubscriptionTokenV1WithdrawRewards =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawTo"`
 */
export const writeSubscriptionTokenV1WithdrawTo =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawTo',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__
 */
export const simulateSubscriptionTokenV1 = /*#__PURE__*/ createSimulateContract(
  { abi: subscriptionTokenV1Abi },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateSubscriptionTokenV1AcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"approve"`
 */
export const simulateSubscriptionTokenV1Approve =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"createReferralCode"`
 */
export const simulateSubscriptionTokenV1CreateReferralCode =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'createReferralCode',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"deleteReferralCode"`
 */
export const simulateSubscriptionTokenV1DeleteReferralCode =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'deleteReferralCode',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"grantTime"`
 */
export const simulateSubscriptionTokenV1GrantTime =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'grantTime',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"initialize"`
 */
export const simulateSubscriptionTokenV1Initialize =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mint"`
 */
export const simulateSubscriptionTokenV1Mint =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintFor"`
 */
export const simulateSubscriptionTokenV1MintFor =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintFor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintWithReferral"`
 */
export const simulateSubscriptionTokenV1MintWithReferral =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintWithReferral',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"mintWithReferralFor"`
 */
export const simulateSubscriptionTokenV1MintWithReferralFor =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'mintWithReferralFor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"pause"`
 */
export const simulateSubscriptionTokenV1Pause =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"reconcileERC20Balance"`
 */
export const simulateSubscriptionTokenV1ReconcileErc20Balance =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'reconcileERC20Balance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"reconcileNativeBalance"`
 */
export const simulateSubscriptionTokenV1ReconcileNativeBalance =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'reconcileNativeBalance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"recoverERC20"`
 */
export const simulateSubscriptionTokenV1RecoverErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'recoverERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"recoverNativeTokens"`
 */
export const simulateSubscriptionTokenV1RecoverNativeTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'recoverNativeTokens',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"refund"`
 */
export const simulateSubscriptionTokenV1Refund =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'refund',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateSubscriptionTokenV1RenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateSubscriptionTokenV1SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateSubscriptionTokenV1SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setSupplyCap"`
 */
export const simulateSubscriptionTokenV1SetSupplyCap =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setSupplyCap',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"setTransferRecipient"`
 */
export const simulateSubscriptionTokenV1SetTransferRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'setTransferRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"slashRewards"`
 */
export const simulateSubscriptionTokenV1SlashRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'slashRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferAllBalances"`
 */
export const simulateSubscriptionTokenV1TransferAllBalances =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferAllBalances',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferFees"`
 */
export const simulateSubscriptionTokenV1TransferFees =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferFees',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateSubscriptionTokenV1TransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateSubscriptionTokenV1TransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"unpause"`
 */
export const simulateSubscriptionTokenV1Unpause =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"updateFeeRecipient"`
 */
export const simulateSubscriptionTokenV1UpdateFeeRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'updateFeeRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"updateMetadata"`
 */
export const simulateSubscriptionTokenV1UpdateMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdraw"`
 */
export const simulateSubscriptionTokenV1Withdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawAndTransferFees"`
 */
export const simulateSubscriptionTokenV1WithdrawAndTransferFees =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawAndTransferFees',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawRewards"`
 */
export const simulateSubscriptionTokenV1WithdrawRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `functionName` set to `"withdrawTo"`
 */
export const simulateSubscriptionTokenV1WithdrawTo =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1Abi,
    functionName: 'withdrawTo',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__
 */
export const watchSubscriptionTokenV1Event =
  /*#__PURE__*/ createWatchContractEvent({ abi: subscriptionTokenV1Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Approval"`
 */
export const watchSubscriptionTokenV1ApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchSubscriptionTokenV1ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"FeeAllocated"`
 */
export const watchSubscriptionTokenV1FeeAllocatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'FeeAllocated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"FeeCollectorChange"`
 */
export const watchSubscriptionTokenV1FeeCollectorChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'FeeCollectorChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"FeeTransfer"`
 */
export const watchSubscriptionTokenV1FeeTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'FeeTransfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Grant"`
 */
export const watchSubscriptionTokenV1GrantEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Grant',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Initialized"`
 */
export const watchSubscriptionTokenV1InitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchSubscriptionTokenV1OwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchSubscriptionTokenV1OwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Paused"`
 */
export const watchSubscriptionTokenV1PausedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Purchase"`
 */
export const watchSubscriptionTokenV1PurchaseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Purchase',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"ReferralCreated"`
 */
export const watchSubscriptionTokenV1ReferralCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'ReferralCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"ReferralDestroyed"`
 */
export const watchSubscriptionTokenV1ReferralDestroyedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'ReferralDestroyed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"ReferralPayout"`
 */
export const watchSubscriptionTokenV1ReferralPayoutEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'ReferralPayout',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Refund"`
 */
export const watchSubscriptionTokenV1RefundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Refund',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"RefundTopUp"`
 */
export const watchSubscriptionTokenV1RefundTopUpEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'RefundTopUp',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"RewardPointsSlashed"`
 */
export const watchSubscriptionTokenV1RewardPointsSlashedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'RewardPointsSlashed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"RewardWithdraw"`
 */
export const watchSubscriptionTokenV1RewardWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'RewardWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"RewardsAllocated"`
 */
export const watchSubscriptionTokenV1RewardsAllocatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'RewardsAllocated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"SupplyCapChange"`
 */
export const watchSubscriptionTokenV1SupplyCapChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'SupplyCapChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchSubscriptionTokenV1TransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"TransferRecipientChange"`
 */
export const watchSubscriptionTokenV1TransferRecipientChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'TransferRecipientChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Unpaused"`
 */
export const watchSubscriptionTokenV1UnpausedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1Abi}__ and `eventName` set to `"Withdraw"`
 */
export const watchSubscriptionTokenV1WithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1Abi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const readSubscriptionTokenV1Factory = /*#__PURE__*/ createReadContract({
  abi: subscriptionTokenV1FactoryAbi,
  address: subscriptionTokenV1FactoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"feeInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const readSubscriptionTokenV1FactoryFeeInfo =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'feeInfo',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const readSubscriptionTokenV1FactoryOwner =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const readSubscriptionTokenV1FactoryPendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1Factory =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"createFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryCreateFee =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'createFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"deploySubscription"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryDeploySubscription =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'deploySubscription',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"destroyFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryDestroyFee =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'destroyFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"transferDeployFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryTransferDeployFees =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'transferDeployFees',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"updateMinimumDeployFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const writeSubscriptionTokenV1FactoryUpdateMinimumDeployFee =
  /*#__PURE__*/ createWriteContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'updateMinimumDeployFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1Factory =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"createFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryCreateFee =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'createFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"deploySubscription"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryDeploySubscription =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'deploySubscription',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"destroyFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryDestroyFee =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'destroyFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"transferDeployFees"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryTransferDeployFees =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'transferDeployFees',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `functionName` set to `"updateMinimumDeployFee"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const simulateSubscriptionTokenV1FactoryUpdateMinimumDeployFee =
  /*#__PURE__*/ createSimulateContract({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    functionName: 'updateMinimumDeployFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"DeployFeeChange"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryDeployFeeChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'DeployFeeChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"DeployFeeTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryDeployFeeTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'DeployFeeTransfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"Deployment"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryDeploymentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'Deployment',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"FeeCreated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryFeeCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'FeeCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"FeeDestroyed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryFeeDestroyedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'FeeDestroyed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link subscriptionTokenV1FactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1)
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A)
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xD0884D249B74B7E6C433bB4130a9d3FCa309170E)
 * - [__View Contract on Zora Explorer__](https://explorer.zora.energy/address/0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323)
 */
export const watchSubscriptionTokenV1FactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: subscriptionTokenV1FactoryAbi,
    address: subscriptionTokenV1FactoryAddress,
    eventName: 'OwnershipTransferred',
  })
