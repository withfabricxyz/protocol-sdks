export type FabricSDKConfig = {
  cfpv1?: {
    factories?: { [key: number]: `0x${string}` };
  };
  stpv1?: {
    factories?: { [key: number]: `0x${string}` };
  };
};

export let config: FabricSDKConfig | null = null;

export function configureFabricSDK(_config: FabricSDKConfig) {
  config = _config;
}
