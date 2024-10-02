export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: BigInt;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
  sacdInput?: { grantee: `0x${string}`; permissions: BigInt; expiration: BigInt; source: string };
};

export type SetVehiclePermissions = {
  tokenId: BigInt;
  grantee: `0x${string}`;
  permissions: BigInt;
  expiration: BigInt;
  source: string;
};

export type SetPermissionsSACD = {
  asset: `0x${string}`;
  tokenId: BigInt;
  grantee: `0x${string}`;
  permissions: BigInt;
  expiration: BigInt;
  source: string;
};

export type BurnVehicle = {
  tokenId: BigInt;
};

export type SendDIMOTokens = {
  recipient: `0x${string}`;
  amount: bigint;
};

export type ClaimAftermarketdevice = {
  aftermarketDeviceNode: BigInt;
  aftermarketDeviceSig: `0x${string}`;
};

export type PairAftermarketDevice = {
  vehicleNode: BigInt;
  aftermarketDeviceNode: BigInt;
};

export type ConnectPrivateKeyParams = {
  privateKey: `0x${string}`;
};

export type ConnectTurnkeyParams = {
  organizationId: string;
  turnkeyApiPublicKey: string;
  turnkeyApiPrivateKey: string;
  signer: `0x${string}`;
  turnkeyBaseURL: string;
};

export type ClientConfigDimo = {
  rpcURL: string;
  bundlrURL: string;
  paymasterURL: string;
  chainExplorerURL: string;

  environment: string;
};

export type SACD_PERMISSIONS = {
  ALLTIME_NONLOCATION?: boolean;
  COMMANDS?: boolean;
  CURRENT_LOCATION?: boolean;
  ALLTIME_LOCATION?: boolean;
  VERIFIABLE_CREDENTIALS?: boolean;
  STREAMS?: boolean;
};
