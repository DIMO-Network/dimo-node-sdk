export const DimoConstants = {
    Production: {
        'NFT_address': '0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF',
        'RPC_provider': 'https://eth.llamarpc.com'
    },
    Dev: {
        'NFT_address': '0x90c4d6113ec88dd4bdf12f26db2b3998fd13a144',
        'RPC_provider': 'https://eth.llamarpc.com'
    } 
} as const;

export type DimoConstants =
    | typeof DimoConstants.Production
    | typeof DimoConstants.Dev