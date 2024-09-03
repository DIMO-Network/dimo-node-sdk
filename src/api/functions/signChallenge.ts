// import { Web3 } from 'web3';
// import { DimoConstants } from '../../constants';
// import { DimoEnvironment } from '../../environments';

// export const signChallenge = async(input: { message: string, private_key: string }, env: keyof typeof DimoEnvironment) => {
//     const web3 = new Web3(DimoConstants[env].RPC_provider);
//     const formatted_key = '0x' + Buffer.from(input.private_key, 'utf8');
//     const response = web3.eth.accounts.sign(input.message, formatted_key);
//     return response.signature;
// }
