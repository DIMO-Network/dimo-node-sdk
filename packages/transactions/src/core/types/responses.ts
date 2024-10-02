export type VehicleNodeMintedWithDeviceDefinition = {
  manufacturerId: BigInt;
  vehicleId: BigInt;
  owner: `0x${string}`;
  deviceDefinitionId: string;
};

export type TypeHashResponse = {
  hash: string;
  payload: {
    domain: {
      name: string;
      version: string;
      chainId: number;
      verifyingContract: `0x${string}`;
    };
    types: {
      ClaimAftermarketDeviceSign: {
        name: string;
        type: string;
      }[];
    };
    message: {
      aftermarketDeviceNode: bigint;
      owner: `0x${string}`;
    };
  };
};
