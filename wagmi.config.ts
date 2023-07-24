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
      ],
      deployments: {
        CrowdFinancingV1Factory: {
          1: '0x8e78d80599197c501353453f73b0b92a402077d6',
          11155111: '0x83a322729C3172B0cc6Bf3a3204Fa83E683c584E',
          137: '0xf53e3729aC1caDd24D5986b2738D0DEE5f4eD30A',
          42161: '0x24379629781d03a0Fe67D9712FD2d76a92EfEF14',
        },
      },
    }),
    actions({
      prepareWriteContract: true,
      readContract: false,
    }),
  ],
});
