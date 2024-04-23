export const countDimoVehicles = () => `
    { 
        vehicles (first:10) {
            totalCount,
        }
    }
`;

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

export const getVehicleDetailsByTokenId = (tokenId: number) => `
{
    vehicle (tokenId: ${tokenId}) {
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
`;