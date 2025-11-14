import { subscriptions } from '@vechain/sdk-network';
import WebSocket from 'ws';

const wsUrl = subscriptions.getNewTransactionsSubscriptionUrl(
  'https://mainnet.vechain.org',
  [],
  {
    address: '0x5ef79995FE8a89e0812330E4378eB2660ceDe699' // YOUR APP CONTRACT
  }
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = (message) => {
  const addedTx = JSON.parse(message.data);
  console.log('New transaction', addedTx);
};
