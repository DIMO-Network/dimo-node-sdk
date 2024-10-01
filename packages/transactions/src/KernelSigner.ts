import { ContractToMapping, ContractType, ENVIRONMENT } from ":core/types/dimoTypes.js";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { Chain, PublicClient, Transport, createPublicClient, encodeFunctionData, http } from "viem";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { BundlerClient, GetUserOperationReceiptReturnType, createBundlerClient } from "permissionless";
import { mintVehicleWithDeviceDefinition } from ":core/actions/mintVehicleWithDeviceDefinition.js";
import { setVehiclePermissions } from ":core/actions/setPermissionsSACD.js";
// import { sendDIMOTokens } from ":core/actions/sendDIMOTokens.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import { ENTRYPOINT } from ":core/constants/contractAddrs.js";
import { SACD_DEFAULT_EXPIRATION, SACD_DEFAULT_PERMISSIONS, SACD_DEFAULT_SOURCE } from ":core/constants/sacd.js";
import {
  ClaimAftermarketdevice,
  MintVehicleWithDeviceDefinition,
  PairAftermarketDevice,
  SendDIMOTokens,
  SetVehiclePermissions,
} from ":core/types/args.js";
import {
  claimAftermarketDevice,
  claimAftermarketDeviceTypeHash,
  pairAftermarketDevice,
} from ":core/actions/claimAndPairAftermarketDevice.js";
import { kernelClientFromPasskey } from ":core/kernelClientFromSigner/kernelClientFromPasskey.js";
import { kernelClientFromPrivateKey } from ":core/kernelClientFromSigner/kernelClientFromPrivateKey.js";
import { TurnkeyClient } from "@turnkey/http";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types";
import { walletClientToSmartAccountSigner } from "permissionless/utils";
import { createWalletClient } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { polygonAmoy } from "viem/chains";
import { createAccount } from "@turnkey/viem";
import {
  CLAIM_AFTERMARKET_DEVICE,
  PAIR_AFTERMARKET_DEVICE,
  SEND_DIMO_TOKENS,
  SET_PERMISSIONS_SACD,
} from ":core/constants/methods.js";

export class KernelSigner {
  publicClient: PublicClient;
  chain: Chain | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain | undefined>;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>;
  contractMapping: ContractToMapping;
  environment: string;
  rpcURL: string;
  bundlerUrl: string | undefined;
  paymasterUrl: string | undefined;
  turnkeyApiBaseUrl: string | undefined;
  entryPoint: `0x${string}` = ENTRYPOINT;

  constructor(
    environment: string = "dev",
    rpcURL: string,
    bundlerUrl?: string,
    paymasterUrl?: string,
    turnkeyApiBaseUrl?: string,
    entryPoint: `0x${string}` = ENTRYPOINT
  ) {
    this.environment = environment;
    this.chain = ENV_NETWORK_MAPPING.get(ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV);
    this.contractMapping = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV].contracts;
    this.publicClient = createPublicClient({
      transport: http(rpcURL),
      chain: this.chain,
    });

    this.rpcURL = rpcURL;
    this.bundlerUrl = bundlerUrl;
    this.paymasterUrl = paymasterUrl;
    this.turnkeyApiBaseUrl = turnkeyApiBaseUrl;
    this.entryPoint = entryPoint;

    if (this.bundlerUrl) {
      this.bundlerClient = createBundlerClient({
        chain: this.chain,
        transport: http(this.bundlerUrl),
        entryPoint: this.entryPoint,
      });
    }
  }

  public async connectPasskey(subOrganizationId: string, address: `0x${string}`, stamper: PasskeyStamper) {
    this.kernelClient = await kernelClientFromPasskey(
      subOrganizationId,
      address,
      stamper,
      this.turnkeyApiBaseUrl!,
      this.bundlerUrl!,
      this.publicClient,
      this.paymasterUrl!
    );
  }

  public async connectPrivateKey(
    privateKey: `0x${string}`,
    bundlrUrl: string,
    paymasterUrl: string,
    entryPoint: `0x${string}` = ENTRYPOINT,
    kernelVersion: KERNEL_V2_VERSION_TYPE = KERNEL_V2_4
  ) {
    this.kernelClient = await kernelClientFromPrivateKey(
      privateKey,
      this.publicClient,
      bundlrUrl,
      paymasterUrl,
      entryPoint,
      kernelVersion
    );

    this.bundlerClient = createBundlerClient({
      chain: this.chain,
      transport: http(bundlrUrl),
      entryPoint: entryPoint,
    });
  }

  public async mintVehicleDefaultPerms(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    if (!args.sacdInput) {
      args.sacdInput = {
        grantee: this.kernelClient.account.address,
        permissions: SACD_DEFAULT_PERMISSIONS,
        expiration: SACD_DEFAULT_EXPIRATION,
        source: SACD_DEFAULT_SOURCE,
      };
    }

    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.environment);
    const userOpHashMint = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResultMint = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHashMint });

    return txResultMint;
  }

  public async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async setVehiclePermissions(args: SetVehiclePermissions): Promise<GetUserOperationReceiptReturnType> {
    const setVehiclePermissionsCallData = await setVehiclePermissions(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: setVehiclePermissionsCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async sendDIMOTokens(
    args: SendDIMOTokens,
    subOrganizationId: string,
    walletAddress: string,
    passkeyStamper: PasskeyStamper,
    kernelSignerConfig: KernelSignerConfig
  ): Promise<GetUserOperationReceiptReturnType> {
    const env = ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV;
    const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
    const contracts = CHAIN_ABI_MAPPING[env].contracts;

    const txData: KernelEncodeCallDataArgs = {
      callType: "call",
      to: contracts[ContractType.DIMO_TOKEN].address,
      value: BigInt("0"),
      data: encodeFunctionData({
        abi: contracts[ContractType.DIMO_TOKEN].abi,
        functionName: SEND_DIMO_TOKENS,
        args: [args.to, args.amount],
      }),
    };

    const { success, reason, userOpHash } = await executeTransaction(
      subOrganizationId,
      walletAddress,
      txData,
      passkeyStamper,
      chain,
      kernelSignerConfig
    );

    if (!success) {
      throw new Error(`Failed to send DIMO tokens: ${reason}`);
    }

    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public claimAftermarketDeviceTypeHash(aftermarketDeviceNode: bigint, owner: `0x${string}`): any[] {
    return claimAftermarketDeviceTypeHash(aftermarketDeviceNode, owner, this.environment);
  }

  public async claimAftermarketDevice(args: ClaimAftermarketdevice): Promise<GetUserOperationReceiptReturnType> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async pairAftermarketDevice(args: PairAftermarketDevice): Promise<GetUserOperationReceiptReturnType> {
    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async claimAndPairAftermarketDevice(
    args: ClaimAftermarketdevice & PairAftermarketDevice
  ): Promise<GetUserOperationReceiptReturnType[]> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.environment);
    const claimADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const claimADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: claimADHash });

    if (!claimADResult.success) {
      return [claimADResult];
    }

    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.environment);
    const pairADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const pairADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: pairADHash });
    return [claimADResult, pairADResult];
  }
}

// const chain = polygonAmoy;
// const entryPoint = entryPoint07Address;
// const kernelVersion = KERNEL_V3_1;
// const turnkeyBaseUrl = "https://api.turnkey.com";

export type KernelSignerConfig = {
  rpcURL: string;
  bundlerUrl: string;
  paymasterUrl: string;
  turnkeyApiBaseUrl: string;
  entryPoint: `0x${string}`;
  kernelVersion: KERNEL_V3_VERSION_TYPE | KERNEL_V2_VERSION_TYPE;
  environment: string;
};

export const newKernelSignerConfig = (
  rpcURL: string,
  bundlerUrl: string,
  paymasterUrl: string,
  turnkeyApiBaseUrl: string = "https://api.turnkey.com",
  entryPoint: `0x${string}` = entryPoint07Address,
  kernelVersion: KERNEL_V3_VERSION_TYPE | KERNEL_V2_VERSION_TYPE = KERNEL_V3_1,
  environment: string = "dev"
): KernelSignerConfig => {
  return {
    rpcURL,
    bundlerUrl,
    paymasterUrl,
    turnkeyApiBaseUrl,
    entryPoint,
    kernelVersion,
    environment,
  };
};

export const claimAftermarketDeviceTransaction = async (
  args: ClaimAftermarketdevice,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt("0"),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: CLAIM_AFTERMARKET_DEVICE,
      args: [args.aftermarketDeviceNode, args.aftermarketDeviceSig],
    }),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, chain, config);

  return resp;
};

export const pairAftermarketDeviceTransaction = async (
  args: PairAftermarketDevice,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt("0"),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: PAIR_AFTERMARKET_DEVICE,
      args: [args.aftermarketDeviceNode, args.vehicleNode],
    }),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, chain, config);

  return resp;
};

export const setVehiclePermissionsTransaction = async (
  args: SetVehiclePermissions,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  const asset = contracts[ContractType.DIMO_VEHICLE_ID].address;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_SACD].address,
    value: BigInt("0"),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_SACD].abi,
      functionName: SET_PERMISSIONS_SACD,
      args: [asset, args.tokenId, args.grantee, args.permissions, args.expiration, args.source],
    }),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, chain, config);

  return resp;
};

export const sendDIMOTransaction = async (
  args: SendDIMOTokens,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_TOKEN].address,
    value: BigInt("0"),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_TOKEN].abi,
      functionName: SEND_DIMO_TOKENS,
      args: [args.to, args.amount],
    }),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, chain, config);

  return resp;
};

export const executeTransaction = async (
  subOrganizationId: string,
  walletAddress: string,
  transactionData: KernelEncodeCallDataArgs,
  passkeyStamper: PasskeyStamper,
  chain: Chain,
  kernelSignerConfig: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const publicClient = createPublicClient({
    transport: http(kernelSignerConfig.rpcURL),
  });

  const passkeyStamperClient = new TurnkeyClient({ baseUrl: kernelSignerConfig.turnkeyApiBaseUrl }, passkeyStamper);

  const localAccount = await createAccount({
    // @ts-ignore
    client: passkeyStamperClient,
    organizationId: subOrganizationId,
    signWith: walletAddress,
    ethereumAddress: walletAddress,
  });

  const smartAccountClient = createWalletClient({
    account: localAccount,
    chain: chain,
    transport: http(kernelSignerConfig.rpcURL),
  });
  const smartAccountSigner = walletClientToSmartAccountSigner(smartAccountClient);
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: smartAccountSigner,
    entryPoint: kernelSignerConfig.entryPoint,
    // @ts-ignore
    kernelVersion: kernelSignerConfig.kernelVersion,
  });

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint: kernelSignerConfig.entryPoint,
    // @ts-ignore
    kernelVersion: kernelSignerConfig.kernelVersion,
  });

  const kernelClient = createKernelAccountClient({
    account,
    chain,
    entryPoint: kernelSignerConfig.entryPoint,
    bundlerTransport: http(kernelSignerConfig.bundlerUrl),
    middleware: {
      // @ts-ignore
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          chain,
          entryPoint: kernelSignerConfig.entryPoint,
          transport: http(kernelSignerConfig.paymasterUrl),
        });
        return zerodevPaymaster.sponsorUserOperation({
          userOperation,
          entryPoint: kernelSignerConfig.entryPoint,
        });
      },
    },
  });

  const bundlerClient = createBundlerClient({
    chain,
    transport: http(kernelSignerConfig.rpcURL),
  });

  const callData = await kernelClient.account.encodeCallData(transactionData);
  const txHash = await kernelClient.sendUserOperation({
    // @ts-ignore
    account: kernelClient.account,
    userOperation: {
      callData,
    },
  });

  const resp = await bundlerClient.waitForUserOperationReceipt({
    hash: txHash,
  });

  return resp;
};
