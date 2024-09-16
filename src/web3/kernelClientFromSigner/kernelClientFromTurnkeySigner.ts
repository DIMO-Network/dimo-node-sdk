import { Chain, Transport, http, createWalletClient, PublicClient } from "viem";
import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { createAccount } from "@turnkey/viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccountClient,
  createKernelAccount,
  createZeroDevPaymasterClient,
  KernelValidator,
} from "@zerodev/sdk";

import { EntryPoint } from "permissionless/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { ENTRYPOINT_ADDRESS_V07, walletClientToSmartAccountSigner } from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { ConnectTurnkeyParams } from "../../utils/types";
import { KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";

export async function kernelClientFromTurnkeySigner(
  params: ConnectTurnkeyParams,
  entrypoint: EntryPoint,
  publicClient: PublicClient,
  kernelVersion: KERNEL_V3_VERSION_TYPE,
  bundlrUrl: string,
  paymasterUrl: string
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>> {
  const turnkeyClient = new TurnkeyClient(
    { baseUrl: params.turnkeyBaseURL },
    new ApiKeyStamper({
      apiPublicKey: params.turnkeyApiPublicKey,
      apiPrivateKey: params.turnkeyApiPrivateKey,
    })
  );

  const turnkeyAccount = await createAccount({
    client: turnkeyClient,
    organizationId: params.organizationId, // organization id
    signWith: params.signer, // private key address (org)
  });

  const walletClient = createWalletClient({
    account: turnkeyAccount,
    transport: http(publicClient.transport.url),
  });

  const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: smartAccountSigner,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
  });

  const kernelAcct = await createKernelAccount(publicClient, {
    entryPoint: entrypoint,
    kernelVersion: kernelVersion,
    plugins: {
      sudo: ecdsaValidator as KernelValidator<EntryPoint, string>,
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

        const res = zerodevPaymaster.sponsorUserOperation({
          userOperation,
          entryPoint: entrypoint,
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
