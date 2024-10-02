import { SACD_PERMISSIONS } from ":core/types/args.js";
import { KernelSignerConfig } from ":core/types/dimo.js";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { entryPoint07Address } from "viem/account-abstraction";

export const newKernelSignerConfig = (
  rpcURL: string,
  bundlerUrl: string,
  paymasterUrl: string,
  turnkeyApiBaseUrl: string = "https://api.turnkey.com",
  entryPoint: `0x${string}` = entryPoint07Address,
  kernelVersion: KERNEL_V3_VERSION_TYPE | KERNEL_V2_VERSION_TYPE = KERNEL_V3_1,
  environment: string = "dev"
): KernelSignerConfig => {
  return {
    rpcURL,
    bundlerUrl,
    paymasterUrl,
    turnkeyApiBaseUrl,
    entryPoint,
    kernelVersion,
    environment,
  };
};

export const sacdPermissionValue = (sacdPerms: SACD_PERMISSIONS): bigint => {
  // nothing in right most position
  let skipZero = "00";
  let alltimeNonlocation = "00";
  let commands = "00";
  let currentLocation = "00";
  let alltimeLocation = "00";
  let verifiableCredentials = "00";
  let streams = "00";

  if (sacdPerms.ALLTIME_NONLOCATION) {
    alltimeNonlocation = "11";
  }

  if (sacdPerms.COMMANDS) {
    commands = "11";
  }

  if (sacdPerms.CURRENT_LOCATION) {
    currentLocation = "11";
  }

  if (sacdPerms.ALLTIME_LOCATION) {
    alltimeLocation = "11";
  }

  if (sacdPerms.VERIFIABLE_CREDENTIALS) {
    verifiableCredentials = "11";
  }

  if (sacdPerms.STREAMS) {
    streams = "11";
  }

  const permissionString =
    streams + verifiableCredentials + alltimeLocation + currentLocation + commands + alltimeNonlocation + skipZero;

  return BigInt(`0b${permissionString}`);
};
