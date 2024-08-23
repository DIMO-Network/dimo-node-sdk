import DimoRegistryABI from "./abis/DimoRegistry.json";
import { polygonAmoy } from "viem/chains";
import { Hex, PrivateKeyAccount, Transport } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, encodeFunctionData, createPublicClient } from "viem";
import { AMOY_DIMO_REGISTRY_ADDRESS } from "./utils/constants";
import {
  createZeroDevPaymasterClient,
  createKernelAccountClient,
  createKernelAccount,
  KernelAccountClient,
  KernelSmartAccount,
} from "@zerodev/sdk";
import { mintVehicleWithDeviceDefinition } from "./actions/mintVehicleWithDeviceDefinition";
import { Client, MintVehicleWithDeviceDefinition, SupportedNetworks } from "./utils/types";

export class DIMOClient {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  mintVehicleWithDeviceDefinition(args: MintVehicleWithDeviceDefinition): Promise<Hex> {
    return mintVehicleWithDeviceDefinition(this.client, args);
  }
}

// TODO: decode these errors for user in return
// 0x1c48d49e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000  --> idk yet, I think it has to do with the args being bad

// 0x4e487b710000000000000000000000000000000000000000000000000000000000000011 --> not enough dcx in the kernel account!!
