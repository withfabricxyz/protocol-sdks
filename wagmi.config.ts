import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins';
import { actions } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      project: '../stp-v2',
      forge: {
        clean: false,
        build: false,
      },
      include: [
        'STPV2.sol/**/*.json',
        'STPV2Factory.sol/**/*.json',
      ],
      deployments: {
        STPV2Factory: {
          11155111: '0x0e1869D738E67fE83323013F2C5e44DF1b788E35',
          8453: '0xd79A71657a45F713817cB5366053a7629AF8Fe74',
        },
      },
    }),
    foundry({
      project: '../contracts',
      include: [
        'CrowdFinancing*/**/*.json',
        'ERC20Token*/**/*.json',
        'SubscriptionTokenV1.sol/**/*.json',
        'SubscriptionTokenV1Factory.sol/**/*.json',
      ],
      deployments: {
        CrowdFinancingV1Factory: {
          1: '0x8e78d80599197c501353453f73b0b92a402077d6',
          11155111: '0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E',
          137: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
          42161: '0x24379629781d03a0Fe67D9712FD2d76a92EfEF14',
          10: '0x19ead00ce8961cffca0551244dc07d87e6ff8f7e',
          7777777: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
          8453: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
        },
        SubscriptionTokenV1Factory: {
          1: '0xf1d0C43D301d4d0Fa1Fc1A57aDE0d2Fe9ca853f6',
          5: '0x7A5433eD0f561D7c98Fe7133F584923d9552B0E1',
          11155111: '0xAAe8931adbF1DFC227B2f2eB619450c4fd5E3323',
          17000: '0xD0884D249B74B7E6C433bB4130a9d3FCa309170E',
          8453: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
          10: '0x4ABd5D3Af06Ce5356a455Eb5eCDC1f07Aa9C083A',
          7777777: '0x3BeF7e58a3F357eC98b639df5c24DaC68Ee3A180',
        },
      },
    }),
    actions({
    }),
  ],
});
