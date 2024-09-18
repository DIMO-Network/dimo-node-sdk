import { Chain, PublicClient, Transport, createWalletClient, http } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  createKernelAccount,
  KernelValidator,
} from "@zerodev/sdk";

import { EntryPoint, ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";

// import { TStamper } from "@turnkey/http/dist/base";
import { TurnkeyClient } from "@turnkey/http";
import { createAccount } from "@turnkey/viem";

import { SmartAccountSigner } from "permissionless/accounts";
import {
  KERNEL_V2_4,
  //  KERNEL_V3_1
} from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { TStamper } from "node_modules/@turnkey/http/dist/base.js";
import { walletClientToSmartAccountSigner } from "permissionless/utils";

const entryPoint = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";

export async function kernelClientFromPasskeySigner(
  subOrganizationId: string,
  address: `0x${string}`,
  stamper: TStamper,
  turnkeyApiBaseUrl: string,
  bundlrUrl: string,
  publicClient: PublicClient,
  paymasterURL: string // is there a constant we can default this to?
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>> {
  const turnkeyClient = new TurnkeyClient(
    {
      baseUrl: turnkeyApiBaseUrl,
    },
    stamper
  );

  const account = await createAccount({
    client: turnkeyClient,
    organizationId: subOrganizationId,
    signWith: address,
    ethereumAddress: address,
  });

  const walletClient = createWalletClient({
    account: account,
    chain: publicClient.chain,
    transport: http(bundlrUrl),
  });

  const signer = walletClientToSmartAccountSigner(walletClient);

  return await kernelClientFromSigner(signer, publicClient, bundlrUrl, paymasterURL);
}

async function kernelClientFromSigner(
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
