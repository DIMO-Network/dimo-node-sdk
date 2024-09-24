export type VehicleNodeMintedWithDeviceDefinition = {
  manufacturerId: BigInt;
  vehicleId: BigInt;
  owner: `0x${string}`;
  deviceDefinitionId: string;
};

export type PermissionsSet = {
  asset: `0x${string}`;
  tokenId: BigInt;
  permissions: BigInt;
  grantee: `0x${string}`;
  expiration: BigInt;
  source: string;
};
