import { subscriptions, ThorClient } from '@vechain/sdk-network';
import WebSocket from 'ws';

const thor = ThorClient.at('https://testnet.vechain.org');

const publicabi = await fetch(
  'https://raw.githubusercontent.com/vechain/b32/master/ABIs/VeBetterDAO-b3tr.json'
);
const abi = await publicabi.json();

const b3tr = thor.contracts.load(
    '0x5ef79995FE8a89e0812330E4378eB2660ceDe699',
    abi
);

const wsUrl = subscriptions.getEventSubscriptionUrl(
  'https://testnet.vechain.org',
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  [null, '0xe579DAAd4Cc9192F753Dec8F3AF5b1668Ac25a65'],
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = (message) => {
  const eventLog = JSON.parse(message.data);
  console.log('Received data', eventLog);
};