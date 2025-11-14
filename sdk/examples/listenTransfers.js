import { subscriptions } from '@vechain/sdk-network';
import WebSocket from 'ws';

const wsUrl = subscriptions.getVETtransfersSubscriptionUrl(
  'https://testnet.vechain.org',
  {
    sender: '0x84ecd03eaE54bbd014A0753F6679782fD355cD28'
  }
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = (message) => {
  const transfer = JSON.parse(message.data);
  console.log('New Transfer', transfer);
};
  
 