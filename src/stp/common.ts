export type ContractRequest = {
  chainId?: number;
  contractAddress: `0x${string}`;
};

export type PayableContractRequest = ContractRequest & {
  erc20?: boolean;
  value: bigint;
};

export type SubscriberRequest = ContractRequest & {
  /** The account address */
  account: `0x${string}`;
};
