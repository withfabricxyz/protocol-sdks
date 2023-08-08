import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins';
import { actions } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      project: process.env.CONTRACTS_DIR,
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
        },
      },
    }),
    actions({
      prepareWriteContract: true,
      readContract: false,
    }),
  ],
});
