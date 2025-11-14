import { ThorClient } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const publicabi = await fetch(
  'https://raw.githubusercontent.com/vechain/b32/master/ABIs/energy.json'
);
const energyAbi = await publicabi.json();

const vtho = thor.contracts.load(
  '0x0000000000000000000000000000456e65726779',
  energyAbi
);

const name = await vtho.read.name();
console.log('Name', name);

const balanceNow = await vtho.read.balanceOf(
  '0x0000000000000000000000000000456e65726779'
);
console.log('Balance Now', balanceNow);

const transfer = await vtho.read.transfer(
  '0x0000000000000000000000000000456e65726779',
  '1'
);
console.log('Transfer Test', transfer);
