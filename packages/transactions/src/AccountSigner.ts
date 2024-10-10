import { AccountConfig, ContractToMapping, ENVIRONMENT } from ":core/types/dimo.js";
import {
  Account,
  Address,
  Chain,
  ParseAccount,
  PublicClient,
  RpcSchema,
  Transport,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import {
  MintVehicleWithDeviceDefinition,
  SendDIMOTokens,
  TransferVehicleAndAftermarketDeviceIDs,
} from ":core/types/args.js";
import { sendDIMOTokensFromAccount } from ":core/actions/sendDIMOTokens.js";
import { polygonAmoy } from "viem/chains";
import { transferVehicleAndAftermarketDeviceIDsFromAccount } from ":core/actions/transferVehicleAndADs.js";
import { safeTransferVehicleID } from ":core/actions/safeTransferVehicles.js";
import { mintVehicleWithDeviceDefinitionFromAccount } from ":core/actions/mintVehicleWithDeviceDefinition.js";

export class AccountSigner {
  config: AccountConfig;
  chain: Chain;
  contractMapping: ContractToMapping;
  address: `0x${string}`;
  account: Account;
  publicClient: PublicClient;
  walletClient: WalletClient<Transport, Chain, ParseAccount<Account | Address>, RpcSchema>;

  constructor(config: AccountConfig) {
    this.config = config;
    this.chain = ENV_NETWORK_MAPPING.get(ENV_MAPPING.get(this.config.environment) ?? ENVIRONMENT.DEV) ?? polygonAmoy;
    this.contractMapping = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.config.environment) ?? ENVIRONMENT.DEV].contracts;
    this.publicClient = createPublicClient({
      transport: http(this.config.rpcURL),
      chain: this.chain,
    });

    this.account = config.account;
    this.address = config.account.address;

    this.walletClient = createWalletClient({
      account: this.account,
      chain: this.chain,
      transport: http(this.config.rpcURL),
    });
  }

  public async sendDIMOTokens(args: SendDIMOTokens): Promise<`0x${string}`> {
    const txResult = sendDIMOTokensFromAccount(args, this.walletClient, this.publicClient, this.config.environment);
    return txResult;
  }

  public async transferVehicleAndAftermarketDevices(
    args: TransferVehicleAndAftermarketDeviceIDs
  ): Promise<`0x${string}`> {
    const txResult = transferVehicleAndAftermarketDeviceIDsFromAccount(
      args,
      this.walletClient,
      this.publicClient,
      this.config.environment
    );
    return txResult;
  }

  public async transferVehicleID(args: {
    from: `0x${string}`;
    to: `0x${string}`;
    vehicleId: BigInt;
  }): Promise<`0x${string}`> {
    const txResult = safeTransferVehicleID(args, this.walletClient, this.publicClient, this.config.environment);
    return txResult;
  }

  public async mintVehicleWithDeviceDefinition(args: MintVehicleWithDeviceDefinition): Promise<`0x${string}`> {
    const txResult = mintVehicleWithDeviceDefinitionFromAccount(
      args,
      this.walletClient,
      this.publicClient,
      this.config.environment
    );
    return txResult;
  }
}
