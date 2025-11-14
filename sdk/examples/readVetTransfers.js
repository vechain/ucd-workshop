import { ThorClient } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const logs = await thor.logs.filterTransferLogs({
    criteriaSet: [{sender: '0x5ef79995FE8a89e0812330E4378eB2660ceDe699'}],
    range: {unit: 'block', from: 20000000, to: 40000000},
    options: {limit: 3},
    order: 'asc',
  });

console.log('Stargate withdrawals:', logs);