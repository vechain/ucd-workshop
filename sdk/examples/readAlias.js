import { ThorClient, vnsUtils } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const alias = await vnsUtils.lookupAddress(
  thor,
  '0xFE10bbff63c5730F698a1D55EA44030Fb462Bbf3'
);
console.log(alias);