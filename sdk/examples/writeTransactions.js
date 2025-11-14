/**
 * This script creates a one-time wallet and prepares your
 * transaction to be signed and propagated to the blockchain.
 * This script can only work if you implement Fee Delegation.
 * 
 * Alternatively, take a look at "selfTransaction.js" to vew
 * how to create a transaction script and sign it with your own
 * VeChain wallet.
 */

import { ThorClient, ProviderInternalBaseWallet, VeChainProvider } from '@vechain/sdk-network';
import { Clause, ABIFunction, Secp256k1, Address, Transaction, HexUInt } from '@vechain/sdk-core';

const thor = ThorClient.at('https://testnet.vechain.org/');

//Creates one-off wallet
const privateKey = await Secp256k1.generatePrivateKey();
const senderAddress = Address.ofPrivateKey(privateKey);
console.log("Address: 0x" + senderAddress.digits)

// Clauses
const clauses = [
    Clause.callFunction(
        '0x8384738c995d49c5b692560ae688fc8b51af1059',
        new ABIFunction({
            name: 'increment',
            inputs: [],
            outputs: [],
            constant: false,
            payable: false,
            type: 'function',
        })
    ),
];

console.log(clauses);

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

// const signer = await provider.getSigner(0);

// // Step 2: Sign transaction
// const rawSignedTx = await signer.signTransaction(tx, privateKey);

// // Step 3: Build Signed Transaction Object
// const signedTx = Transaction.decode(
//   HexUInt.of(rawSignedTx).bytes,
//   true
// );

// // Step 4: Send Transaction
// const sendTransactionResult = await thor.transactions.sendTransaction(signedTx);
// console.log(sendTransactionResult)

// // NOTE!!! PAUSE HERE. SHOW HOW WE GET AN ERROR AS THE WALLET NEEDS TO BE FUNDED. 
// // THERE'S A METHOD BELOW THIS VIDEO WHERE WE SHOW HOW TO USE YOUR OWN SIGNER ADDRESS. 
// // HOWEVER, VECHAIN OFFERS A UNIQUE "FEE DELEGATION" FUNCTION THAT OFFLOADS THE GAS FEES 
// // TO A SPONSOR. WE'LL TAKE A LOOK AT THIS IN THE NEXT VIDEO

// // Wait for results
// const txReceipt = await thor.transactions.waitForTransaction(sendTransactionResult.id);
// console.log(txReceipt);