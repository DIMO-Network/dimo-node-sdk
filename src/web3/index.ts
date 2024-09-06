import { Chain, Transport, PublicClient, http, createPublicClient } from "viem";
import { CHAIN_ABI_MAPPING, ENV_NETWORK_MAPPING } from "../utils/constants";
import { KernelSmartAccount, KernelAccountClient } from "@zerodev/sdk";
import {
  ChainInfos,
  ContractType,
  MintVehicleWithDeviceDefinition,
  ConnectPasskeyParams,
  ConnectPrivateKeyParams,
  ConnectTurnkeyParams,
  ENVIRONMENT,
} from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { DimoError } from "../utils/error";
import { KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { BundlerClient, ENTRYPOINT_ADDRESS_V07, createBundlerClient } from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { SendUserOperationParameters } from "permissionless/actions/smartAccount";
import { mintVehicleWithDeviceDefinition } from "./actions/mintVehicleWithDeviceDefinition";
import { polygonAmoy } from "viem/chains";
import { kernelClientFromTurnkeySigner } from "./kernelClientFromSigner/kernelClientFromTurnkeySigner";
import { kernelClientFromPasskeySigner } from "./kernelClientFromSigner/kernelClientFromPasskeySigner";
import { kernelClientFromPrivateKeySigner } from "./kernelClientFromSigner/kernelClientFromPrivateKeySigner";
import { TurnkeyClient } from "@turnkey/http";
import { TStamper } from "@turnkey/http/dist/base";
import { SmartAccount } from "permissionless/accounts";

export class DimoWeb3Client {
  publicClient: PublicClient;
  chainAddrMapping: ChainInfos;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>> | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain> | undefined;

  constructor(env: ENVIRONMENT.DEV) {
    const chain = ENV_NETWORK_MAPPING.get(env) || polygonAmoy;
    this.chainAddrMapping = CHAIN_ABI_MAPPING[env];
    this.publicClient = createPublicClient({
      transport: http(process.env.RPC_URL as string),
      chain: chain as Chain,
    });
  }

  // async connectPasskeySigner(stamper: TStamper) {
  //   const client = new TurnkeyClient({ baseUrl: "https://api.turnkey.com" }, stamper);
  //   // const getWhoamiResult = await client.getWhoami({
  //   //   organizationId: process.env.EXPO_PUBLIC_TURNKEY_ORGANIZATION_ID,
  //   // });

  //   // client.signTransaction();
  // }

  async connectTurnkeySigner(params: ConnectTurnkeyParams) {
    this.kernelClient = await kernelClientFromTurnkeySigner(
      params,
      ENTRYPOINT_ADDRESS_V07,
      this.publicClient,
      KERNEL_V3_1,
      process.env.BUNDLER_URL as string,
      process.env.PAYMASTER_URL as string
    );
  }

  // TODO: test this with some passkey accounts
  // that eduardo and crystal have set up
  async connectKernalAccountPasskey(params: ConnectPasskeyParams) {
    this.kernelClient = await kernelClientFromPasskeySigner(params, ENTRYPOINT_ADDRESS_V07, this.publicClient);
  }

  async connectKernalAccountPrivateKey(params: ConnectPrivateKeyParams) {
    this.kernelClient = await kernelClientFromPrivateKeySigner(
      params,
      ENTRYPOINT_ADDRESS_V07,
      this.publicClient,
      KERNEL_V3_1,
      process.env.BUNDLER_URL as string,
      process.env.PAYMASTER_URL as string
    );
  }

  // async execute(argname: string) {
  // TODO: we should be able to get a method just by the arg name and execute it here with args of [...]any
  //   });

  async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition,
    returnForSignature: boolean = false
  ): Promise<any> {
    if (this.kernelClient === undefined) {
      throw new DimoError("Kernel client is not initialized");
    }

    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(
      args,
      this.kernelClient,
      this.chainAddrMapping.contracts
    );

    if (returnForSignature) {
      return this._returnUserOperationForSignature(mintVehicleCallData as `0x${string}`);
    }

    return this._submitUserOperation(mintVehicleCallData as `0x${string}`);
  }

  async _returnUserOperationForSignature(callData: `0x${string}`): Promise<any> {
    const userOp: SendUserOperationParameters<EntryPoint, SmartAccount<EntryPoint>> = {
      account: this.kernelClient?.account as SmartAccount<EntryPoint, string, Transport, Chain>,
      userOperation: {
        callData: callData,
      },
    };
    const userOperationForSignature = await this.kernelClient?.prepareUserOperationRequest({
      ...userOp,
      account: this.kernelClient?.account as any,
    });
    return userOperationForSignature;
  }

  async _submitUserOperation(callData: `0x${string}`): Promise<any> {
    const txHash = await this.kernelClient?.sendUserOperation({
      // @ts-ignore
      account: this.kernelClient?.account,
      userOperation: {
        callData: callData as `0x${string}`,
      },
    });

    // this.kernelClient?.bundlerTransport?.waitForUserOperationReceipt({ hash: txHash! });

    // const bundlrClient = createBundlerClient({
    //   chain: this.publicClient.chain,
    //   transport: this.kernelClient?.bundlerTransport.htt
    // });

    const txResult = await this.bundlerClient?.waitForUserOperationReceipt({ hash: txHash! });
    return txResult;
  }

  // async _fundWalletDCX(walletAddress: `0x${string}`, amount: BigInt): Promise<any> {
  //   let dimoCreditsInstance = new ethers.Contract(
  //     process.env.DIMO_CREDITS_CONTRACT_ADDRESS as string,
  //     this.chainAddrMapping.contracts[ContractType.DIMO_CREDIT].abi,
  //     new ethers.Wallet(
  //       process.env.DIMO_CREDITS_SIGNER as string,
  //       new ethers.JsonRpcProvider(process.env.RPC_URL as string)
  //     )
  //   );

  //   const tx = await dimoCreditsInstance.mintInDimo(walletAddress, amount);
  //   tx.wait();

  //   const balance = await dimoCreditsInstance.balanceOf(walletAddress);
  //   return balance;
  // }
}
