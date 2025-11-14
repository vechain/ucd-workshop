import { ThorClient } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const publicabi = await fetch(
  'https://raw.githubusercontent.com/vechain/b32/master/ABIs/VeBetterDAO-b3tr.json'
);
const abi = await publicabi.json();

const b3tr = thor.contracts.load(
    '0x5ef79995FE8a89e0812330E4378eB2660ceDe699',
    abi
);

const logs = await thor.logs.filterEventLogs({
  criteriaSet: [...b3tr.filters.Transfer().criteriaSet],
  range: {
    unit: 'block',
    from: 20000000,
    to: 40000000,
  },
  options: { limit: 100 },
  order: 'asc',
});

console.log(logs);