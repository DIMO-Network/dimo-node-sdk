import DimoRegistryABI from "../utils/abis/DimoRegistry.json";
import { polygonAmoy } from "viem/chains";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, encodeFunctionData, createPublicClient, Chain } from "viem";
import { AMOY_DIMO_REGISTRY_ADDRESS, MINT_VEHICLE_WITH_DEVICE_DEFINITION } from "../utils/constants";
import { createZeroDevPaymasterClient, createKernelAccountClient, createKernelAccount } from "@zerodev/sdk";
import { ClientConfig, MintVehicleWithDeviceDefinition } from "../utils/types";

export async function mintVehicleWithDeviceDefinition(
  args: MintVehicleWithDeviceDefinition,
  client: ClientConfig,
  chain: Chain
): Promise<`0x${string}`> {
  const publicClient = createPublicClient({
    transport: http(client.rpcUrl),
    chain: chain,
  });

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: client.entrypointAddress,
    kernelVersion: client.kernelVersion,
    signer: client.signer,
  });

  const account = await createKernelAccount(publicClient, {
    entryPoint: client.entrypointAddress,
    kernelVersion: client.kernelVersion,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

  const zerodevPaymaster = createZeroDevPaymasterClient({
    account: account,
    entryPoint: client.entrypointAddress,
    signer: client.signer,
    transport: http(client.paymasterUrl),
  });

  const kernelClient = createKernelAccountClient({
    entryPoint: client.entrypointAddress,
    account: account,
    chain: chain,
    bundlerTransport: http(client.bundlerUrl),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: client.entrypointAddress });
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
