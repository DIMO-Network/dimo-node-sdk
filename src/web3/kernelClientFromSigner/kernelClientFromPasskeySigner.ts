import { Chain, PublicClient, Transport, createWalletClient, http } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  createKernelAccount,
  KernelValidator,
} from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { walletClientToSmartAccountSigner } from "permissionless";
import { TStamper } from "@turnkey/http/dist/base";
import { TurnkeyClient } from "@turnkey/http";
import { createAccount } from "@turnkey/viem";
import { SmartAccountSigner } from "permissionless/accounts";
import { entryPoint07Address } from "viem/constants/address";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";

export async function kernelClientFromPasskeySigner(
  subOrganizationId: string,
  address: `0x${string}`,
  stamper: TStamper,
  turnkeyApiBaseUrl: string,
  bundlrUrl: string,
  publicClient: PublicClient,
  paymasterURL: string // is there a constant we can default this to?
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>> {
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
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>> {
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: signer,
    entryPoint: entryPoint07Address,
    kernelVersion: KERNEL_V3_1,
  });

  const kernelAcct = (await createKernelAccount(publicClient, {
    entryPoint: entryPoint07Address,
    kernelVersion: KERNEL_V3_1,
    plugins: {
      sudo: ecdsaValidator as KernelValidator<EntryPoint, string> | undefined,
    },
  })) as KernelSmartAccount<typeof entryPoint07Address> | undefined;

  const kernelClient = createKernelAccountClient({
    account: kernelAcct,
    entryPoint: entryPoint07Address,
    chain: publicClient.chain,
    bundlerTransport: http(bundlrUrl),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          // @ts-ignore
          account: kernelAcct,
          chain: publicClient.chain,
          entryPoint: entryPoint07Address,
          transport: http(paymasterUrl),
        });

        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: entryPoint07Address });
        return res;
      },
    },
  });

  return kernelClient as KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;
}

// export async function kernelClientFromPasskeySigner(
//   params: ConnectPasskeyParams,
//   entrypoint: EntryPoint,
//   publicClient: PublicClient
// ): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>> {
//   const webAuthnKey = await toWebAuthnKey({
//     passkeyName: params.passkeyName,
//     passkeyServerUrl: params.passkeyServerUrl,
//     mode: WebAuthnMode.Login,
//     passkeyServerHeaders: {},
//   });

//   const passkeyValidator = await toPasskeyValidator(publicClient, {
//     webAuthnKey,
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
//     kernelVersion: KERNEL_V3_1,
//     validatorContractVersion: PasskeyValidatorContractVersion.V0_0_2,
//   });

//   const kernelAcct = (await createKernelAccount(publicClient, {
//     plugins: {
//       sudo: passkeyValidator,
//     },
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
//     kernelVersion: KERNEL_V3_1,
//   })) as KernelSmartAccount<EntryPoint, Transport, Chain>;

//   return createKernelAccountClient({
//     account: kernelAcct,
//     entryPoint: entrypoint,
//     chain: publicClient.chain,
//     bundlerTransport: http(process.env.BUNDLER_URL as string),
//     middleware: {
//       sponsorUserOperation: async ({ userOperation }) => {
//         const zerodevPaymaster = createZeroDevPaymasterClient({
//           // @ts-ignore
//           account: kernelAcct,
//           chain: publicClient.chain,
//           entryPoint: entrypoint,
//           transport: http(process.env.PAYMASTER_URL as string),
//         });

//         const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: entrypoint });
//         return res;
//       },
//     },
//   }) as KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;
// }
