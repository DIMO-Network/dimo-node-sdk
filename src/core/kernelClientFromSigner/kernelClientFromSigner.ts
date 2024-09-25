import { Chain, http, PublicClient, Transport } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  createKernelAccount,
  KernelValidator,
} from "@zerodev/sdk";

import { EntryPoint, ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";

import { SmartAccountSigner } from "permissionless/accounts";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";

const entryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

export async function kernelClientFromSigner(
  signer: SmartAccountSigner<"custom", `0x${string}`>,
  publicClient: PublicClient,
  bundlrUrl: string,
  paymasterUrl: string
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>> {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: signer,
    entryPoint: entryPoint,
    kernelVersion: KERNEL_V2_4,
  });

  const kernelAcct = (await createKernelAccount(publicClient, {
    entryPoint: entryPoint,
    kernelVersion: KERNEL_V2_4,
    plugins: {
      sudo: ecdsaValidator as KernelValidator<EntryPoint, string> | undefined,
    },
  })) as KernelSmartAccount<ENTRYPOINT_ADDRESS_V07_TYPE> | undefined;

  const kernelClient = createKernelAccountClient({
    account: kernelAcct,
    entryPoint: entryPoint,
    chain: publicClient.chain,
    bundlerTransport: http(bundlrUrl),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          // @ts-ignore
          account: kernelAcct,
          chain: publicClient.chain,
          entryPoint: entryPoint,
          transport: http(paymasterUrl),
        });

        const res = zerodevPaymaster.sponsorUserOperation({
          userOperation,
          entryPoint: entryPoint,
        });
        return res;
      },
    },
  });

  return kernelClient as KernelAccountClient<
    EntryPoint,
    Transport,
    Chain,
    KernelSmartAccount<EntryPoint, Transport, Chain>
  >;
}
