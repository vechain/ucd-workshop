import { ThorClient } from '@vechain/sdk-network';

const thor = ThorClient.at('https://mainnet.vechain.org');

const account = await thor.accounts.getAccount(
  '0xFE10bbff63c5730F698a1D55EA44030Fb462Bbf3'
);

console.log(account);
console.log('VET Balance', Number(BigInt(account.balance)/1000000000000000000n));
console.log('VTHO Balance', Number(BigInt(account.energy)/1000000000000000000n));