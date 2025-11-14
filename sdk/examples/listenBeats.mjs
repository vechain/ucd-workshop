import { subscriptions } from '@vechain/sdk-network';
import pkg from '@vechain/sdk-core';
const { bloomUtils } = pkg;
import WebSocket from 'ws';

const textEncoder = new TextEncoder();

// address to look for, enter your own or a contract
const addressToTest = '0x0000000000000000000000000000000000000000';

// encode the word "Energy" that maps to the VTHO Energy contract
const dataToTest = `0x${Buffer.from(textEncoder.encode('Energy')).toString('hex')}`;

// build a subscription url for the WebSocket connection
const wsUrl = subscriptions.getBeatSubscriptionUrl(
  'https://mainnet.vechain.org'

  // optionally pass in { blockID: "0x.." } to continue at a specific block
);

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to', wsUrl);
};

ws.onmessage = async (message) => {
  const block = JSON.parse(message.data);
  console.log('New block', block);
};
