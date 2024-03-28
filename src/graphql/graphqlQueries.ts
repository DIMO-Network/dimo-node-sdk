import { gql } from 'graphql-request';


export const countDimoVehicles = () => gql`
    { 
        vehicles (first:10) {
            totalCount,
        }
    }
`;

export const listVehicleDefinitionsPerAddress = (address: string, limit: number) => gql`
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

export const getVehicleDetailsByTokenId = (tokenId: number) => gql`
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