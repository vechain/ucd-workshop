import { ThorClient } from '@vechain/sdk-network';

const thor = ThorClient.at('https://testnet.vechain.org');

const account = await thor.accounts.getAccount(
  '0x01d6b50b31c18d7f81ede43935cadf79901b0ea0'
);

console.log(account);
console.log('VET Balance', BigInt(account.balance)/1000000000000000000n );
console.log('VTHO Balance', BigInt(account.energy)/1000000000000000000n );