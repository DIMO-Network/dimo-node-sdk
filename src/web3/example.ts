import { privateKeyToAccount } from "viem/accounts";
import { DimoWeb3Client } from "./index";
import * as dotenv from "dotenv";
import { polygonAmoy } from "viem/chains";
import { ENVIRONMENT, ClientConfigDimo } from "../utils/types";

dotenv.config();

async function main() {
  const dimoClient = new DimoWeb3Client({
    chain: polygonAmoy,
    rpcURL: process.env.RPC_URL as string,
    bundlrURL: process.env.BUNDLER_URL as string,
    paymasterURL: process.env.PAYMASTER_URL as string,
    chainExplorerURL: process.env.CHAIN_EXPLORER_URL as string, // TODO: can we get tx status using this
    environment: ENVIRONMENT.DEV,
  } as ClientConfigDimo);

  // await dimoClient.connectKernalAccountPasskey({
  //   passkeyName: "dimo",
  //   passkeyServerUrl: "loclhost",
  // });

  await dimoClient.connectKernalAccountPrivateKey({
    privateKey: process.env.PRIVATE_KEY as `0x${string}`,
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

  console.log(process.env.CHAIN_EXPLORER_URL + "/tx/" + transactionHash);
}

main().catch(console.error);
