/**
 * This script leverages the Ethers library to prepare 
 * your wallet to sign a transaction.
 * 
 * This script can be adapted to work with Fee Delegation.
 * 
 * Alternatively, take a look at "transaction.js" to vew
 * how to create a transaction script and sign it with a 
 * one-time wallet.
 */

import { ThorClient, VeChainProvider, ProviderInternalBaseWallet } from "@vechain/sdk-network";
import { Clause, ABIFunction, Transaction, HexUInt } from "@vechain/sdk-core";
import { Wallet as EthersWallet } from 'ethers';

import 'dotenv/config';

const thor = ThorClient.at('https://testnet.vechain.org');

const mnemonic = process.env.MNEMONIC;
const prepWallet = EthersWallet.fromPhrase(mnemonic);
const privateKey = prepWallet.privateKey.slice(2);
const senderAddress = prepWallet.address.toLowerCase();
console.log(senderAddress, "0x"+ privateKey);

// /// Clauses
// const clauses = [
//     Clause.callFunction(
//         '0x8384738c995d49c5b692560ae688fc8b51af1059',
//         new ABIFunction({
//             name: 'increment',
//             inputs: [],
//             outputs: [],
//             constant: false,
//             payable: false,
//             type: 'function',
//         })
//     ),
// ];

// //Calculate Gas
// const gasResult = await thor.transactions.estimateGas(clauses);

// //Build Transaction.
// // Fee delegation is set to "false" by default
// const tx = await thor.transactions.buildTransactionBody(clauses, gasResult.totalGas);

// // Sign Transaction. Needs 4 steps
// //Step 1: Get signer
// const wallet = new ProviderInternalBaseWallet(
//   [{ privateKey: privateKey, address: senderAddress }]
// );

// const provider = new VeChainProvider( thor, wallet,
//   // Enable fee delegation
//  false
// );

// const signer = await provider.getSigner();

// // Step 2: Sign transaction
// const rawSignedTx = await signer.signTransaction(tx, privateKey);

// // Step 3: Build Signed Transaction Object
// const signedTx = Transaction.decode(
//   HexUInt.of(rawSignedTx).bytes,
//   true
// );

// // Step 4: Send Transaction
// const sendTransactionResult = await thor.transactions.sendTransaction(signedTx);

// // Wait for results
// const txReceipt = await thor.transactions.waitForTransaction(sendTransactionResult.id);
// // console.log(txReceipt);