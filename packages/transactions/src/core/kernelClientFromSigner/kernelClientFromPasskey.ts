import { Chain, PublicClient, Transport, createWalletClient, http } from "viem";
import { KernelSmartAccount, KernelAccountClient } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { TurnkeyClient } from "@turnkey/http";
import { createAccount } from "@turnkey/viem";
import { walletClientToSmartAccountSigner } from "permissionless/utils";
import { kernelClientFromSigner } from "./kernelClientFromSigner.js";

export async function kernelClientFromPasskey(
  subOrganizationId: string,
  address: `0x${string}`,
  turnkeyClient: TurnkeyClient,
  bundlrUrl: string,
  publicClient: PublicClient,
  paymasterURL: string
): Promise<KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>> {
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
