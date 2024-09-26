export const DimoConstants = {
    Production: {
        'NFT_address': '0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF',
        'RPC_provider': 'https://eth.llamarpc.com',
        'DLX_address': '0x9A9D2E717bB005B240094ba761Ff074d392C7C85',
        'DCX_address': '0x7186F9aC35d24c9a4cf1E58a797c04DF1b334322',
        'Vehicle_address': '0xba5738a18d83d41847dffbdc6101d37c69c9b0cf'

    },
    Dev: {
        'NFT_address': '0x45fbCD3ef7361d156e8b16F5538AE36DEdf61Da8',
        'RPC_provider': 'https://eth.llamarpc.com',
        'DLX_address': ''
    } 
} as const;

export type DimoConstants =
    | typeof DimoConstants.Production
    | typeof DimoConstants.Dev