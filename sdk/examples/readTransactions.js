import { ThorClient } from '@vechain/sdk-network';
const thor = ThorClient.at('https://mainnet.vechain.org');

const tx = await thor.transactions.getTransaction(
    '0x11d6c3593e1f36dbcb0ffd21032b9c1db3b0ce1853082bf5adb98e1f85b7b5f0'
);
console.log(tx);

// const txReceipt = await thor.transactions.getTransactionReceipt(
//     '0x1228fa0f179d046c0245d2fe9f4cea5f93df0c74c25e7561f69325bc137b642e'
// );
// console.log(txReceipt);
