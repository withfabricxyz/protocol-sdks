import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // benchmark: {
    //   outputFile: './bench/report.json',
    //   reporters: process.env.CI ? ['json'] : ['verbose'],
    // },
    coverage: {
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: [
        '**/dist/**',
        '**/*.test.ts',
        '**/_test/**',
        '**/bytecode.ts',
        '**/generated.ts',
      ],
    },
    environment: 'node',
    // setupFiles: ['./src/_test/setup.ts'],
    globalSetup: ['./src/_test/globalSetup.ts'],
    hookTimeout: 15_000,
    testTimeout: 10_000,
  },
});