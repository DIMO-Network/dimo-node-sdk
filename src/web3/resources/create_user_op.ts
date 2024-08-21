import { Hex } from "viem";

function _createUserOperation(callData: Hex) {
  // get sender address
  const senderAddress = "0x1234567890";

  // get nonce
  const nonce = 0;

  const userOperation = {
    sender: senderAddress,
    nonce: BigInt(nonce),
    initCode: "0x" as `0x${string}`,
    callData: callData,
    maxFeePerGas: BigInt(0), // get max gas fee
    maxPriorityFeePerGas: BigInt(0), // get max priority fee
    // include dummy signature?
  };

  // const sponsoredUserOp = await this.PaymasterClient.sponsorUserOperation({
  //   userOperation: userOperation,
  //   entryPoint: this.entryPointAddress,
  // });

  // return json
}
