import DimoRegistryABI from "./utils/abis/DimoRegistry.json";
import { polygonAmoy, polygon } from "viem/chains";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, encodeFunctionData, createPublicClient, Chain, PrivateKeyAccount } from "viem";
import { AMOY_DIMO_REGISTRY_ADDRESS, MINT_VEHICLE_WITH_DEVICE_DEFINITION } from "./utils/constants";
import { createZeroDevPaymasterClient, createKernelAccountClient, createKernelAccount } from "@zerodev/sdk";
import { ClientConfig, MintVehicleWithDeviceDefinition, SupportedNetworks } from "./utils/types";
import { EntryPoint } from "permissionless/types";
import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";

export class DIMOClient {
  private signer: PrivateKeyAccount;
  chain: Chain;
  bundlrUrl: string;
  paymasterUrl: string;
  rpcUrl: string;
  entrypointAddress: EntryPoint;
  kernelVersion: KERNEL_V2_VERSION_TYPE | KERNEL_V3_VERSION_TYPE;

  constructor(config: ClientConfig) {
    this.signer = config.signer;
    this.bundlrUrl = config.bundlerUrl;
    this.paymasterUrl = config.paymasterUrl;
    this.entrypointAddress = config.entrypointAddress;
    this.kernelVersion = config.kernelVersion;
    this.rpcUrl = config.rpcUrl;

    switch (config.network) {
      case SupportedNetworks.AMOY:
        this.chain = polygonAmoy;
        break;
      case SupportedNetworks.POLYGON:
        this.chain = polygon;
        break;
      default:
        throw new Error("Unsupported network");
    }
  }

  async mintVehicleWithDeviceDefinition(args: MintVehicleWithDeviceDefinition): Promise<`0x${string}`> {
    const publicClient = createPublicClient({
      transport: http(this.rpcUrl),
      chain: this.chain,
    });

    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      entryPoint: this.entrypointAddress,
      kernelVersion: this.kernelVersion,
      signer: this.signer,
    });

    const account = await createKernelAccount(publicClient, {
      entryPoint: this.entrypointAddress,
      kernelVersion: this.kernelVersion,
      plugins: {
        sudo: ecdsaValidator,
      },
    });

    const kernelClient = createKernelAccountClient({
      account,
      entryPoint: this.entrypointAddress,
      chain: this.chain,
      bundlerTransport: http(this.bundlrUrl),
      middleware: {
        sponsorUserOperation: async ({ userOperation }) => {
          const zerodevPaymaster = createZeroDevPaymasterClient({
            // @ts-ignore
            account: account,
            chain: this.chain,
            entryPoint: this.entrypointAddress,
            transport: http(this.paymasterUrl),
          });

          const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: this.entrypointAddress });
          return res;
        },
      },
    });

    const mintVehicleCallData = await kernelClient.account.encodeCallData({
      to: AMOY_DIMO_REGISTRY_ADDRESS,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: DimoRegistryABI,
        functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
        args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
      }),
    });

    const txHash = await kernelClient.sendUserOperation({
      // @ts-ignore
      account: account,
      userOperation: {
        callData: mintVehicleCallData,
      },
    });

    return txHash;
  }
}

// TODO: decode these errors for user in return
// 0x1c48d49e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000  --> idk yet, I think it has to do with the args being bad

// 0x4e487b710000000000000000000000000000000000000000000000000000000000000011 --> not enough dcx in the kernel account!!
