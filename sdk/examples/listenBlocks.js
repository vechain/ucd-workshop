import { subscriptions } from '@vechain/sdk-network';
import WebSocket from 'ws';

const wsUrl = subscriptions.getBlockSubscriptionUrl(
  'https://mainnet.vechain.org'
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = (message) => {
  const block = JSON.parse(message.data);
  console.log('New block', block);
};
