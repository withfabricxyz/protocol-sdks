import { Config } from '@wagmi/core';

export type FabricSDKConfig = {
  cfpv1?: {
    factories?: { [key: number]: `0x${string}` };
  };
  stpv1?: {
    factories?: { [key: number]: `0x${string}` };
  };
  stpv2?: {
    factories?: { [key: number]: `0x${string}` };
  };
  wagmiConfig?: Config;
};

export let config: FabricSDKConfig | null = null;

export function configureFabricSDK(_config: FabricSDKConfig) {
  config = {
    ...config,
    ..._config,
  };
}

export function wagmiConfig(): Config {
  if (!config?.wagmiConfig) {
    throw new Error(
      'Wagmi config not set. Please call configureFabricSDK({ wagmiConfig: Config }) before using the SDK',
    );
  }
  return config.wagmiConfig;
}
