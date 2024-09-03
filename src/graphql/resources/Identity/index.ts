import { Resource } from "../../Resource";
import { DimoEnvironment } from "../../../environments";

export class Identity extends Resource {
  constructor(api: any) {
    super(api, "Identity");
    this.query({
      query: true,
    }),
      this.setQueries({
        countDimoVehicles: {
          query: `
                { 
                    vehicles (first:10) {
                        totalCount,
                    }
                }
                `,
        },
        listVehicleDefinitionsPerAddress: {
          params: {
            address: true,
            limit: true,
          },
          query: `
                {
                    vehicles(filterBy: {owner: $address}, first: $limit) {
                      nodes {
                        aftermarketDevice {
                            tokenId
                            address
                        }
                          syntheticDevice {
                            address
                            tokenId
                        }
                        definition {
                          make
                          model
                          year
                        }
                      }
                    }
                  }
                `,
        },
      });
  }
}

export const listVehicleDefinitionsPerAddress = (address: string, limit: number) => `
{
    vehicles(filterBy: {owner: "${address}"}, first: ${limit}) {
      nodes {
        aftermarketDevice {
            tokenId
            address
        }
          syntheticDevice {
            address
            tokenId
        }
        definition {
          make
          model
          year
        }
      }
    }
  }
`;

// export const getVehicleDetailsByTokenId = (tokenId: number) => `
// {
//     vehicle (tokenId: ${tokenId}) {
//       aftermarketDevice {
//         tokenId
//         address
//       }
//       syntheticDevice {
//         address
//         tokenId
//       }
//       definition {
//         make
//         model
//         year
//       }
//     }
//   }
// `;

// export const test = () => `
// {
//     vehicles(filterBy: {owner: "0xf9D26323Ab49179A6d57C26515B01De018553787"}, first: 10) {
//       nodes {
//         definition {
//           make
//           model
//           year
//         }
//       }
//     }
//   }
// `;
