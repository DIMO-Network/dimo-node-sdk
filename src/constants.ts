export const DimoConstants = {
    Production: {
        'NFT_address': '0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF',
        'RPC_provider': 'https://eth.llamarpc.com'
    },
    Dev: {
        'NFT_address': '0x45fbCD3ef7361d156e8b16F5538AE36DEdf61Da8',
        'RPC_provider': 'https://eth.llamarpc.com'
    } 
} as const;

export type DimoConstants =
    | typeof DimoConstants.Production
    | typeof DimoConstants.Dev