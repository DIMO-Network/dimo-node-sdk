import { Chain, Transport, PublicClient, http } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { KERNEL_V2_VERSION_TYPE } from "@zerodev/sdk/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { privateKeyToAccount } from "viem/accounts";
import { SmartAccountSigner } from "permissionless/accounts";
import { ENTRYPOINT } from ":core/constants.js";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";

export async function kernelClientFromPrivateKey(
  privateKey: `0x${string}`,
  publicClient: PublicClient,
  bundlrUrl: string,
  paymasterUrl: string,
  entryPoint: `0x${string}` = ENTRYPOINT,
  kernelVersion: KERNEL_V2_VERSION_TYPE = KERNEL_V2_4
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>> {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    entryPoint: entryPoint,
    kernelVersion: kernelVersion,
    signer: privateKeyToAccount(privateKey) as SmartAccountSigner<"privateKey", `0x${string}`>,
  });

  const kernelAcct = await createKernelAccount(publicClient, {
    entryPoint: entryPoint,
    kernelVersion: kernelVersion,
    plugins: {
      sudo: ecdsaValidator,
    },
  });

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

        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: entryPoint });
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
