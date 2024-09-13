import { Chain, Transport, PublicClient, http, createPublicClient } from "viem";
import { CHAIN_ABI_MAPPING, ENV_NETWORK_MAPPING } from "../utils/constants";
import { KernelSmartAccount, KernelAccountClient } from "@zerodev/sdk";
import { ChainInfos, MintVehicleWithDeviceDefinition, ConnectPrivateKeyParams, ENVIRONMENT } from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { DimoError } from "../utils/error";
import { BundlerClient, ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { mintVehicleWithDeviceDefinition } from "./actions/mintVehicleWithDeviceDefinition";
import { polygonAmoy } from "viem/chains";
import { TStamper } from "@turnkey/http/dist/base";
import { SmartAccount } from "permissionless/accounts";
import { kernelClientFromPasskeySigner } from "./kernelClientFromSigner/kernelClientFromPasskeySigner";
import { kernelClientFromPrivateKeySigner } from "./kernelClientFromSigner/kernelClientFromPrivateKeySigner";

export class DimoWeb3Client {
  publicClient: PublicClient;
  chainAddrMapping: ChainInfos;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>> | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain> | undefined;
  chain: ENVIRONMENT = ENVIRONMENT.PROD;
  paymasterURL: string;
  bundlerURL: string;

  constructor(env: ENVIRONMENT.DEV, rpcURL: string, paymasterURL: string, bundlerURL: string) {
    const chain = ENV_NETWORK_MAPPING.get(env) || polygonAmoy;
    this.chainAddrMapping = CHAIN_ABI_MAPPING[env];

    this.publicClient = createPublicClient({
      transport: http(rpcURL as string),
      chain: chain as Chain,
    });

    this.paymasterURL = paymasterURL;
    this.bundlerURL = bundlerURL;
  }

  async connectKernalAccountPasskey(
    subOrganizationId: string,
    address: `0x${string}`,
    stamper: TStamper,
    turnkeyApiBaseUrl: string,
    bundlrUrl: string
  ) {
    this.kernelClient = await kernelClientFromPasskeySigner(
      subOrganizationId,
      address,
      stamper,
      turnkeyApiBaseUrl,
      bundlrUrl,
      this.publicClient,
      this.paymasterURL
    );
  }

  async connectKernalAccountPrivateKey(params: ConnectPrivateKeyParams) {
    this.kernelClient = await kernelClientFromPrivateKeySigner(
      params,
      ENTRYPOINT_ADDRESS_V07,
      this.publicClient,
      KERNEL_V3_1,
      this.bundlerURL,
      this.paymasterURL
    );
  }

  async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition,
    returnForSignature: boolean = false
  ): Promise<any> {
    if (this.kernelClient === undefined) {
      throw new DimoError("Kernel client is not initialized");
    }

    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.chain);

    if (returnForSignature) {
      return this._returnUserOperationForSignature(mintVehicleCallData as `0x${string}`);
    }

    return this._submitUserOperation(mintVehicleCallData as `0x${string}`);
  }

  async _returnUserOperationForSignature(callData: `0x${string}`): Promise<any> {
    const userOp = {
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

    const txResult = await this.bundlerClient?.waitForUserOperationReceipt({ hash: txHash! });
    return txResult;
  }
}
