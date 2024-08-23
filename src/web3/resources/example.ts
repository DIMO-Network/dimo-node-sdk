import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";
import { DIMOClient } from "./index";
import { SupportedNetworks } from "./utils/types";
import * as dotenv from "dotenv";
dotenv.config();

const d = new DIMOClient({
  network: SupportedNetworks.AMOY,
  signer: privateKeyToAccount(process.env.SIGNERPRIVATEKEY as `0x${string}`),
});

const g = d.mintVehicleWithDeviceDefinition({
  manufacturerNode: BigInt(127),
  owner: "0x2BBB5d347D7F4a312199C30869253094499aB049",
  deviceDefinitionID: "tesla_model-3_2019",
  attributeInfo: [],
});
