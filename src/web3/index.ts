import { encodeFunctionData, Chain, Transport } from "viem";
import {
  CHAIN_ABI_MAPPING,
  CHAIN_TO_NETWORK_ENUM_MAPPING,
  MINT_VEHICLE_WITH_DEVICE_DEFINITION,
  SUPPORTED_CHAINS,
} from "../utils/constants";
import { KernelSmartAccount, KernelAccountClient } from "@zerodev/sdk";
import { ClientConfig, ContractType, MintVehicleWithDeviceDefinition, SupportedNetworks } from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { CustomError } from "utils/error";
import { ChainInfos } from "types";

export class DIMOClient {
  chainAddrMapping: ChainInfos;
  kernelAcctClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;

  constructor(config: ClientConfig) {
    if (!SUPPORTED_CHAINS.includes(config.kernelClient.chain)) {
      throw new CustomError(`Network ${config.kernelClient.chain.name} is not supported`);
    }

    this.chainAddrMapping =
      CHAIN_ABI_MAPPING[CHAIN_TO_NETWORK_ENUM_MAPPING.get(config.kernelClient.chain.name) as SupportedNetworks];
    this.kernelAcctClient = config.kernelClient;
  }

  // async execute(argname: string) {
  //   this.chainAddrMapping.contracts[ContractType.DIMO_REGISTRY].abi.forEach((item) => {
  //     if (item.type == "function") {
  //       if (item.name == argname) {
  //         console.log(item.inputs);
  //       }
  //     }
  //   });
  // }

  async mintVehicleWithDeviceDefinition(args: MintVehicleWithDeviceDefinition): Promise<`0x${string}`> {
    const mintVehicleCallData = await this.kernelAcctClient.account.encodeCallData({
      to: this.chainAddrMapping.contracts[ContractType.DIMO_REGISTRY].address,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: this.chainAddrMapping.contracts[ContractType.DIMO_REGISTRY].abi,
        functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
        args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
      }),
    });

    const txHash = await this.kernelAcctClient.sendUserOperation({
      // @ts-ignore
      account: account,
      userOperation: {
        callData: mintVehicleCallData,
      },
    });

    return txHash;
  }
}

// TODO: decode these errors for user in return
// 0x1c48d49e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000  --> idk yet, I think it has to do with the args being bad

// 0x4e487b710000000000000000000000000000000000000000000000000000000000000011 --> not enough dcx in the kernel account!!
