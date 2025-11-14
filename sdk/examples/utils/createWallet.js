import { Secp256k1, Address } from '@vechain/sdk-core';

const privateKey = await Secp256k1.generatePrivateKey();
const senderAddress = Address.ofPrivateKey(privateKey);

console.log("Address: 0x" + senderAddress.digits)