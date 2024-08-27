import { privateKeyToAccount } from "viem/accounts";
import { DIMOClient } from "./index";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import * as dotenv from "dotenv";
import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
dotenv.config();

async function main() {
  const signerAcct = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  const publicClient = createPublicClient({
    transport: http(process.env.RPC_URL as string),
    chain: polygonAmoy,
  });

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
    signer: signerAcct,
  });

  const kernelAcct = await createKernelAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

  const kernelClient = createKernelAccountClient({
    account: kernelAcct,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    chain: polygonAmoy,
    bundlerTransport: http(process.env.BUNDLER_URL as string),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          // @ts-ignore
          account: kernelAcct,
          chain: polygonAmoy,
          entryPoint: ENTRYPOINT_ADDRESS_V07,
          transport: http(process.env.PAYMASTER_URL as string),
        });

        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: ENTRYPOINT_ADDRESS_V07 });
        return res;
      },
    },
  });

  const dimoClient = new DIMOClient({
    kernelClient: kernelClient as any, // TODO, this should be any generic signer
  });

  const transactionHash = await dimoClient.mintVehicleWithDeviceDefinition({
    manufacturerNode: BigInt(64),
    owner: process.env.OWNER_WALLET as `0x${string}`,
    deviceDefinitionID: "lamborghini_murcielago_2010",
    attributeInfo: [
      {
        attribute: "Make",
        info: "Lamborghini",
      },
    ],
  });

  console.log(transactionHash);
}

main().catch(console.error);
