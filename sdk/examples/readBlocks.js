import { ThorClient } from '@vechain/sdk-network';

const thor = ThorClient.at('https://mainnet.vechain.org');

const compressed = await thor.blocks.getBlockCompressed('finalized');
console.log(compressed);

// const expanded = await thor.blocks.getBlockExpanded(22404150);
// console.log(expanded);