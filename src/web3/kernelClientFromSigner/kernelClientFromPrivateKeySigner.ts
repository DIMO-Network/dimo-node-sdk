import { Chain, Transport, PublicClient, http } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { privateKeyToAccount } from "viem/accounts";
import { ConnectPrivateKeyParams } from "utils";
import { SmartAccountSigner } from "permissionless/accounts";

export async function kernelClientFromPrivateKeySigner(
  params: ConnectPrivateKeyParams,
  entrypoint: EntryPoint,
  publicClient: PublicClient,
  kernelVersion: KERNEL_V3_VERSION_TYPE,
  bundlrUrl: string,
  paymasterUrl: string
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>> {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: entrypoint,
    kernelVersion: kernelVersion,
    signer: privateKeyToAccount(params.privateKey) as SmartAccountSigner<"privateKey", `0x${string}`>,
  });

  const kernelAcct = await createKernelAccount(publicClient, {
    entryPoint: entrypoint,
    kernelVersion: kernelVersion,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

  const kernelClient = createKernelAccountClient({
    account: kernelAcct,
    entryPoint: entrypoint,
    chain: publicClient.chain,
    bundlerTransport: http(bundlrUrl),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          // @ts-ignore
          account: kernelAcct,
          chain: publicClient.chain,
          entryPoint: entrypoint,
          transport: http(paymasterUrl),
        });

        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: entrypoint });
        return res;
      },
    },
  });

  return kernelClient as KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;
}
