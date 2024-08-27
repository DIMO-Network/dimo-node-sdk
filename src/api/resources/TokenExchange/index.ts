import { Resource } from "../../Resource";
import { DimoEnvironment } from "../../../environments";

export class TokenExchange extends Resource {
  constructor(api: any, vehicleNFTAddr: string) {
    super(api, "TokenExchange");
    this.setResource({
      exchange: {
        method: "POST",
        path: "/v1/tokens/exchange",
        body: {
          nftContractAddress: vehicleNFTAddr,
          privileges: true,
          tokenId: true,
        },
        auth: "access_token",
        return: "privilege_token",
      },
    });
  }
}
