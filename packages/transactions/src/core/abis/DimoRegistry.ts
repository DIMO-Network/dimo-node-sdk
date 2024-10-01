import { Abi } from "viem";

export const abiRegistry: Abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "UintUtils__InsufficientHexLength",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "moduleAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4[]",
        name: "selectors",
        type: "bytes4[]",
      },
    ],
    name: "ModuleAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "moduleAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4[]",
        name: "selectors",
        type: "bytes4[]",
      },
    ],
    name: "ModuleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldImplementation",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4[]",
        name: "oldSelectors",
        type: "bytes4[]",
      },
      {
        indexed: false,
        internalType: "bytes4[]",
        name: "newSelectors",
        type: "bytes4[]",
      },
    ],
    name: "ModuleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "bytes4[]",
        name: "selectors",
        type: "bytes4[]",
      },
    ],
    name: "addModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "bytes4[]",
        name: "selectors",
        type: "bytes4[]",
      },
    ],
    name: "removeModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oldImplementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes4[]",
        name: "oldSelectors",
        type: "bytes4[]",
      },
      {
        internalType: "bytes4[]",
        name: "newSelectors",
        type: "bytes4[]",
      },
    ],
    name: "updateModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AdNotClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AdPaired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "InvalidNode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "VehiclePaired",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "AftermarketDeviceAttributeSetDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "adNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceNodeBurnedDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDevicePaired",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceTransferredDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
    ],
    name: "AftermarketDeviceUnclaimedDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceUnpairedDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ddId",
        type: "string",
      },
    ],
    name: "DeviceDefinitionIdSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "SyntheticDeviceAttributeSetDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "syntheticDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SyntheticDeviceNodeBurnedDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "VehicleAttributeRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "VehicleAttributeSetDevAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "VehicleNodeBurnedDevAdmin",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "adminBurnAftermarketDevices",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "adminBurnAftermarketDevicesAndDeletePairings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "adminBurnSyntheticDevicesAndDeletePairings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "adminBurnVehicles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "adminBurnVehiclesAndDeletePairings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCacheDimoStreamrEns",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newParentNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "nodeIdList",
        type: "uint256[]",
      },
    ],
    name: "adminChangeParentNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
    ],
    name: "adminPairAftermarketDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "adminRemoveVehicleAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "vehicleId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "deviceDefinitionId",
            type: "string",
          },
        ],
        internalType: "struct DevAdmin.VehicleIdDeviceDefinitionId[]",
        name: "vehicleIdDdId",
        type: "tuple[]",
      },
    ],
    name: "adminSetVehicleDDs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct DevAdmin.IdManufacturerName[]",
        name: "idManufacturerNames",
        type: "tuple[]",
      },
    ],
    name: "renameManufacturers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferAftermarketDeviceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "aftermarketDeviceNodes",
        type: "uint256[]",
      },
    ],
    name: "unclaimAftermarketDeviceNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "aftermarketDeviceNodes",
        type: "uint256[]",
      },
    ],
    name: "unpairAftermarketDeviceByDeviceNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "vehicleNodes",
        type: "uint256[]",
      },
    ],
    name: "unpairAftermarketDeviceByVehicleNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multiDelegateCall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multiStaticCall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AdNotPaired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attr",
        type: "string",
      },
    ],
    name: "AttributeExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attr",
        type: "string",
      },
    ],
    name: "AttributeNotWhitelisted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "DeviceAlreadyClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "DeviceAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAdSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidLicense",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwnerSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "InvalidParentNode",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnersDoNotMatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "VehicleNotPaired",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "aftermarketDeviceAddress",
        type: "address",
      },
    ],
    name: "AftermarketDeviceAddressReset",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "AftermarketDeviceAttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "AftermarketDeviceAttributeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "AftermarketDeviceIdProxySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceNodeBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "aftermarketDeviceAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceNodeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "AftermarketDeviceUnpaired",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addAftermarketDeviceAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "aftermarketDeviceSig",
        type: "bytes",
      },
    ],
    name: "claimAftermarketDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "aftermarketDeviceNodeId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct AftermarketDeviceOwnerPair[]",
        name: "adOwnerPair",
        type: "tuple[]",
      },
    ],
    name: "claimAftermarketDeviceBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "ownerSig",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "aftermarketDeviceSig",
        type: "bytes",
      },
    ],
    name: "claimAftermarketDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    name: "getAftermarketDeviceAddressById",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getAftermarketDeviceIdByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    name: "isAftermarketDeviceClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "isClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairs",
            type: "tuple[]",
          },
        ],
        internalType: "struct AftermarketDeviceInfos[]",
        name: "adInfos",
        type: "tuple[]",
      },
    ],
    name: "mintAftermarketDeviceByManufacturerBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
    ],
    name: "pairAftermarketDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "aftermarketDeviceSig",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "vehicleOwnerSig",
        type: "bytes",
      },
    ],
    name: "pairAftermarketDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "pairAftermarketDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "aftermarketDeviceNodeList",
        type: "uint256[]",
      },
    ],
    name: "reprovisionAftermarketDeviceByManufacturerBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "aftermarketDeviceNodeId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "deviceAddress",
            type: "address",
          },
        ],
        internalType: "struct AftermarketDeviceIdAddressPair[]",
        name: "adIdAddrs",
        type: "tuple[]",
      },
    ],
    name: "resetAftermarketDeviceAddressByManufacturerBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setAftermarketDeviceIdProxyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
    ],
    name: "setAftermarketDeviceInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
    ],
    name: "unpairAftermarketDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "aftermarketDeviceNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "unpairAftermarketDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "ControllerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "ManufacturerAttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "ManufacturerAttributeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "ManufacturerIdProxySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ManufacturerNodeMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addManufacturerAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "getManufacturerIdByName",
    outputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getManufacturerNameById",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isAllowedToOwnManufacturerNode",
    outputs: [
      {
        internalType: "bool",
        name: "_isAllowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isController",
    outputs: [
      {
        internalType: "bool",
        name: "_isController",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isManufacturerMinted",
    outputs: [
      {
        internalType: "bool",
        name: "_isManufacturerMinted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfoPairList",
        type: "tuple[]",
      },
    ],
    name: "mintManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
    ],
    name: "mintManufacturerBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setManufacturerIdProxyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfoList",
        type: "tuple[]",
      },
    ],
    name: "setManufacturerInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "updateManufacturerMinted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "AlreadyController",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "IntegrationNameRegisterd",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "MustBeAdmin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "NotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyNftProxy",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "IntegrationAttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "IntegrationAttributeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "IntegrationIdProxySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "IntegrationNodeMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addIntegrationAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "getIntegrationIdByName",
    outputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getIntegrationNameById",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isAllowedToOwnIntegrationNode",
    outputs: [
      {
        internalType: "bool",
        name: "_isAllowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isIntegrationController",
    outputs: [
      {
        internalType: "bool",
        name: "_isController",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isIntegrationMinted",
    outputs: [
      {
        internalType: "bool",
        name: "_isIntegrationMinted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfoPairList",
        type: "tuple[]",
      },
    ],
    name: "mintIntegration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
    ],
    name: "mintIntegrationBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
    ],
    name: "setIntegrationController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setIntegrationIdProxyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfoList",
        type: "tuple[]",
      },
    ],
    name: "setIntegrationInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "updateIntegrationMinted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "InvalidSdSignature",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "SyntheticDeviceAttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "SyntheticDeviceAttributeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "SyntheticDeviceIdProxySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "syntheticDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SyntheticDeviceNodeBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "integrationNode",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "syntheticDeviceNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "syntheticDeviceAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SyntheticDeviceNodeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    name: "VehicleAttributeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "VehicleNodeMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "deviceDefinitionId",
        type: "string",
      },
    ],
    name: "VehicleNodeMintedWithDeviceDefinition",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addSyntheticDeviceAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "syntheticDeviceNode",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "ownerSig",
        type: "bytes",
      },
    ],
    name: "burnSyntheticDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    name: "getSyntheticDeviceAddressById",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getSyntheticDeviceIdByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "integrationNode",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "vehicleNode",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "syntheticDeviceAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairs",
            type: "tuple[]",
          },
        ],
        internalType: "struct MintSyntheticDeviceBatchInput[]",
        name: "data",
        type: "tuple[]",
      },
    ],
    name: "mintSyntheticDeviceBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "integrationNode",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vehicleNode",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "syntheticDeviceSig",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "vehicleOwnerSig",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "syntheticDeviceAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairs",
            type: "tuple[]",
          },
        ],
        internalType: "struct MintSyntheticDeviceInput",
        name: "data",
        type: "tuple",
      },
    ],
    name: "mintSyntheticDeviceSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setSyntheticDeviceIdProxyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
    ],
    name: "setSyntheticDeviceInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "VehicleAttributeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "VehicleIdProxySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleNode",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "VehicleNodeBurned",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "addVehicleAttribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "ownerSig",
        type: "bytes",
      },
    ],
    name: "burnVehicleSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "getDeviceDefinitionIdByVehicleId",
    outputs: [
      {
        internalType: "string",
        name: "ddId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
    ],
    name: "mintVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "mintVehicleSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "deviceDefinitionId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "grantee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "permissions",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "source",
            type: "string",
          },
        ],
        internalType: "struct SacdInput",
        name: "sacdInput",
        type: "tuple",
      },
    ],
    name: "mintVehicleWithDeviceDefinition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "deviceDefinitionId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
    ],
    name: "mintVehicleWithDeviceDefinition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerNode",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "deviceDefinitionId",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "mintVehicleWithDeviceDefinitionSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "setVehicleIdProxyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "attribute",
            type: "string",
          },
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        internalType: "struct AttributeInfoPair[]",
        name: "attrInfo",
        type: "tuple[]",
      },
    ],
    name: "setVehicleInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "validateBurnAndResetNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getDataURI",
    outputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "attribute",
        type: "string",
      },
    ],
    name: "getInfo",
    outputs: [
      {
        internalType: "string",
        name: "info",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getParentNode",
    outputs: [
      {
        internalType: "uint256",
        name: "parentNode",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "BeneficiarySet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
    ],
    name: "getBeneficiary",
    outputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceNode",
        type: "uint256",
      },
    ],
    name: "getLink",
    outputs: [
      {
        internalType: "uint256",
        name: "targetNode",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddressSource",
        type: "address",
      },
      {
        internalType: "address",
        name: "idProxyAddressTarget",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceNode",
        type: "uint256",
      },
    ],
    name: "getNodeLink",
    outputs: [
      {
        internalType: "uint256",
        name: "targetNode",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nodeId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "setAftermarketDeviceBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "manufacturerNode",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairsVehicle",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "integrationNode",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "vehicleOwnerSig",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "syntheticDeviceSig",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "syntheticDeviceAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairsDevice",
            type: "tuple[]",
          },
        ],
        internalType: "struct MintVehicleAndSdInput",
        name: "data",
        type: "tuple",
      },
    ],
    name: "mintVehicleAndSdSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "manufacturerNode",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "deviceDefinitionId",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairsVehicle",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "integrationNode",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "vehicleOwnerSig",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "syntheticDeviceSig",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "syntheticDeviceAddr",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfoPairsDevice",
            type: "tuple[]",
          },
        ],
        internalType: "struct MintVehicleAndSdWithDdInput",
        name: "data",
        type: "tuple",
      },
    ],
    name: "mintVehicleAndSdWithDeviceDefinitionSign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dataUri",
        type: "string",
      },
    ],
    name: "BaseDataURISet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "idProxyAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_baseDataURI",
        type: "string",
      },
    ],
    name: "setBaseDataURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dimoCredit",
        type: "address",
      },
    ],
    name: "DimoCreditSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dimoToken",
        type: "address",
      },
    ],
    name: "DimoTokenSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "foundation",
        type: "address",
      },
    ],
    name: "FoundationSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "manufacturerLicense",
        type: "address",
      },
    ],
    name: "ManufacturerLicenseSet",
    type: "event",
  },
  {
    inputs: [],
    name: "getDimoCredit",
    outputs: [
      {
        internalType: "address",
        name: "dimoCredit",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDimoToken",
    outputs: [
      {
        internalType: "address",
        name: "dimoToken",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFoundation",
    outputs: [
      {
        internalType: "address",
        name: "foundation",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getManufacturerLicense",
    outputs: [
      {
        internalType: "address",
        name: "manufacturerLicense",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dimoCredit",
        type: "address",
      },
    ],
    name: "setDimoCredit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dimoToken",
        type: "address",
      },
    ],
    name: "setDimoToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "foundation",
        type: "address",
      },
    ],
    name: "setFoundation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "manufacturerLicense",
        type: "address",
      },
    ],
    name: "setManufacturerLicense",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "dimoStreamrEns",
        type: "string",
      },
    ],
    name: "DimoStreamrEnsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "dimoStreamrNode",
        type: "address",
      },
    ],
    name: "DimoStreamrNodeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "streamRegistry",
        type: "address",
      },
    ],
    name: "StreamRegistrySet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "dimoStreamrEns",
        type: "string",
      },
    ],
    name: "setDimoBaseStreamId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dimoStreamrNode",
        type: "address",
      },
    ],
    name: "setDimoStreamrNode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamRegistry",
        type: "address",
      },
    ],
    name: "setStreamRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "enum IStreamRegistry.PermissionType",
        name: "permissionType",
        type: "uint8",
      },
    ],
    name: "NoStreamrPermission",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    name: "StreamDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    name: "VehicleStreamAlreadySet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "VehicleStreamNotSet",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "streamId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
    ],
    name: "SubscribedToVehicleStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    name: "VehicleStreamSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    name: "VehicleStreamUnset",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "createVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "getVehicleStream",
    outputs: [
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "onBurnVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
    ],
    name: "onSetSubscribePrivilege",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "onTransferVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
    ],
    name: "setSubscriptionToVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
    ],
    name: "setVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
    ],
    name: "subscribeToVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "vehicleId",
        type: "uint256",
      },
    ],
    name: "unsetVehicleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "ChainNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "InvalidManufacturerId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
    ],
    name: "TableAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
    ],
    name: "TableDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "DeviceDefinitionDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "model",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "DeviceDefinitionInserted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tableOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
    ],
    name: "DeviceDefinitionTableCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "DeviceDefinitionUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
    ],
    name: "ManufacturerTableSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tableOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
    ],
    name: "createDeviceDefinitionTable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tableOwner",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "manufacturerIds",
        type: "uint256[]",
      },
    ],
    name: "createDeviceDefinitionTableBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "deleteDeviceDefinition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
    ],
    name: "getDeviceDefinitionTableId",
    outputs: [
      {
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
    ],
    name: "getDeviceDefinitionTableName",
    outputs: [
      {
        internalType: "string",
        name: "tableName",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "year",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "ksuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "deviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct DeviceDefinitionInput",
        name: "data",
        type: "tuple",
      },
    ],
    name: "insertDeviceDefinition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "year",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "ksuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "deviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct DeviceDefinitionInput[]",
        name: "data",
        type: "tuple[]",
      },
    ],
    name: "insertDeviceDefinitionBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tableId",
        type: "uint256",
      },
    ],
    name: "setDeviceDefinitionTable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "manufacturerId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "metadata",
            type: "string",
          },
          {
            internalType: "string",
            name: "ksuid",
            type: "string",
          },
          {
            internalType: "string",
            name: "deviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
        ],
        internalType: "struct DeviceDefinitionUpdateInput",
        name: "data",
        type: "tuple",
      },
    ],
    name: "updateDeviceDefinition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getPolicy",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "allowInsert",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "allowUpdate",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "allowDelete",
            type: "bool",
          },
          {
            internalType: "string",
            name: "whereClause",
            type: "string",
          },
          {
            internalType: "string",
            name: "withCheck",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "updatableColumns",
            type: "string[]",
          },
        ],
        internalType: "struct TablelandPolicy",
        name: "policy",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "operation",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    name: "OperationCostSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "operation",
        type: "bytes32",
      },
    ],
    name: "getDcxOperationCost",
    outputs: [
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "operation",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    name: "setDcxOperationCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
