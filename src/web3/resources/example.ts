import { privateKeyToAccount } from "viem/accounts";
import { DIMOClient } from "./index";
import { SupportedNetworks } from "./utils/types";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const dimoClient = new DIMOClient({
    network: SupportedNetworks.AMOY,
    signer: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
    rpcUrl: process.env.RPC_URL as string,
    paymasterUrl: process.env.PAYMASTER_URL as string,
    bundlerUrl: process.env.BUNDLER_URL as string,
    entrypointAddress: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
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
