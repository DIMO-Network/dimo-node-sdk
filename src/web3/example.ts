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
    chainExplorerURL: process.env.CHAIN_EXPLORER_URL as string,
    environment: ENVIRONMENT.DEV,
  } as ClientConfigDimo);

  await dimoClient.connectKernelAccountTurnkey({
    organizationId: process.env.ORGANIZATION_ID as string,
    turnkeyBaseURL: process.env.TURNKEY_API_BASE_URL as string,
    turnkeyApiPublicKey: process.env.TURNKEY_API_PUBLIC_KEY as string,
    turnkeyApiPrivateKey: process.env.TURNKEY_API_PRIVATE_KEY as string,
    turnkeyPKSignerAddress: process.env.TURNKEY_PRIVATE_KEY_ADDRESS as `0x${string}`,
  });

  console.log("Kernel Account Address: ", dimoClient.kernelClient?.account.address);

  const tx = await dimoClient.mintVehicleWithDeviceDefinition({
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

  console.log(tx.receipt?.transactionHash, tx.sender);
}

main().catch(console.error);
