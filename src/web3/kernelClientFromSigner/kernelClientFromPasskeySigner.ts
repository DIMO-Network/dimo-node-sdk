import { Chain, PublicClient, Transport, http } from "viem";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import {
  WebAuthnMode,
  toWebAuthnKey,
  toPasskeyValidator,
  PasskeyValidatorContractVersion,
} from "@zerodev/passkey-validator";
import { ConnectPasskeyParams } from "utils/types";

export async function kernelClientFromPasskeySigner(
  params: ConnectPasskeyParams,
  entrypoint: EntryPoint,
  publicClient: PublicClient
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>> {
  const webAuthnKey = await toWebAuthnKey({
    passkeyName: params.passkeyName,
    passkeyServerUrl: params.passkeyServerUrl,
    mode: WebAuthnMode.Login,
    passkeyServerHeaders: {},
  });

  const passkeyValidator = await toPasskeyValidator(publicClient, {
    webAuthnKey,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
    validatorContractVersion: PasskeyValidatorContractVersion.V0_0_2,
  });

  const kernelAcct = (await createKernelAccount(publicClient, {
    plugins: {
      sudo: passkeyValidator,
    },
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion: KERNEL_V3_1,
  })) as KernelSmartAccount<EntryPoint, Transport, Chain>;

  return createKernelAccountClient({
    account: kernelAcct,
    entryPoint: entrypoint,
    chain: publicClient.chain,
    bundlerTransport: http(process.env.BUNDLER_URL as string),
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zerodevPaymaster = createZeroDevPaymasterClient({
          // @ts-ignore
          account: kernelAcct,
          chain: publicClient.chain,
          entryPoint: entrypoint,
          transport: http(process.env.PAYMASTER_URL as string),
        });

        const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: entrypoint });
        return res;
      },
    },
  }) as KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;
}
