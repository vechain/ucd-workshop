import { ThorClient } from '@vechain/sdk-network';

const thor = ThorClient.at('https://mainnet.vechain.org');

const filteredLogs = await thor.logs.filterRawEventLogs({
  criteriaSet: [
    {
      address: '0x5ef79995FE8a89e0812330E4378eB2660ceDe699',
    },
  ],
  range: {
    unit: 'block',
    from: 20000000,
  },
  options: { limit: 3 },
});

console.log('Results', filteredLogs);