import { createConfig, Config } from '@wagmi/core';

export type FabricSDKConfig = {
  wagmiConfig?: Config;
  crowdFiFactoryOverrides?: { [key: number]: `0x${string}` };
}

export let config: FabricSDKConfig | null = null;

export function configureFabricSDK(_config: FabricSDKConfig) {
  config = _config;
  if(config.wagmiConfig) {
    createConfig(config.wagmiConfig.args);
  }
}
