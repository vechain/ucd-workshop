import { ThorClient, vnsUtils } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const alias = await vnsUtils.lookupAddress(
  thor,
  '0x9366662519dc456bd5b8bc4ee4b6852338d82f08'
);
console.log(alias);