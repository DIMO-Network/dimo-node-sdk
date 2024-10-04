import { AccountConfig, ContractToMapping, ContractType, ENVIRONMENT } from ":core/types/dimo.js";
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
import { SendDIMOTokens, TransferVehicleAndAftermarketDeviceIDs } from ":core/types/args.js";
import { sendDIMOTokensFromAccount } from ":core/actions/sendDIMOTokens.js";
import { polygonAmoy } from "viem/chains";
import { transferVehicleAndAftermarketDeviceIDsFromAccount } from ":core/actions/transferVehicleAndADs.js";
import { safeTransferVehicleID } from ":core/actions/safeTransferVehicles.js";
import { TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS } from ":core/constants/methods.js";
import { privateKeyToAccount } from "viem/accounts";

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

  public async transferVehicleAndAftermarketDevicesPK(
    args: TransferVehicleAndAftermarketDeviceIDs,
    privateKey: `0x${string}`
  ): Promise<`0x${string}`> {
    const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.config.environment) ?? ENVIRONMENT.DEV].contracts;

    const publicClient = createPublicClient({
      transport: http(this.config.rpcURL),
      chain: this.chain,
    });

    const account = privateKeyToAccount(privateKey);

    const walletClient = createWalletClient({
      account: account,
      chain: this.chain,
      transport: http(this.config.rpcURL),
    });

    const { request } = await publicClient.simulateContract({
      address: contracts[ContractType.DIMO_FORWARDER].address,
      abi: contracts[ContractType.DIMO_FORWARDER].abi,
      functionName: TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS,
      args: [args.vehicleIds, args.aftermarketDeviceIds, args.to],
      account: walletClient.account,
    });

    const txResult = await walletClient.writeContract(request);

    return txResult;
  }
}
