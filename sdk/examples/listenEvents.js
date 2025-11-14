import { subscriptions } from '@vechain/sdk-network';
import WebSocket from 'ws';

const wsUrl = subscriptions.getEventSubscriptionUrl(
  'https://mainnet.vechain.org',
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  [], 
  {
    blockID: '0x015b6c67dd7a96e0e5f16ad0f3d04a81b02601b6595e51c1ca67300810b0880b'
  }
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = (message) => {
  const eventLog = JSON.parse(message.data);
  console.log('Received data', eventLog);
};