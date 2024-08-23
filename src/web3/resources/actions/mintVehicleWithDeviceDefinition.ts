import DimoRegistryABI from "../utils/abis/DimoRegistry.json";
import { polygonAmoy } from "viem/chains";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, encodeFunctionData, createPublicClient } from "viem";
import { AMOY_DIMO_REGISTRY_ADDRESS, MINT_VEHICLE_WITH_DEVICE_DEFINITION } from "../utils/constants";
import { createZeroDevPaymasterClient, createKernelAccountClient, createKernelAccount } from "@zerodev/sdk";
import { Client, MintVehicleWithDeviceDefinition } from "../utils/types";

export async function mintVehicleWithDeviceDefinition(
  client: Client,
  args: MintVehicleWithDeviceDefinition
): Promise<`0x${string}`> {
  const publicClient = createPublicClient({
    transport: http(process.env.RPC_AMOY),
    chain: polygonAmoy,
  });

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
    signer: client.signer,
  });

  const account = await createKernelAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

  const zerodevPaymaster = createZeroDevPaymasterClient({
    account: account,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    chain: polygonAmoy,
    transport: http(process.env.ZERODEV_PAYMASTER_URL),
  });

  const kernelClient = createKernelAccountClient({
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    account: account,
    chain: polygonAmoy,
    bundlerTransport: http(process.env.ZERODEV_BUNDLER_URL),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: ENTRYPOINT_ADDRESS_V07 });
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
    account: account,
    userOperation: {
      callData: mintVehicleCallData,
    },
  });

  return txHash;
}
