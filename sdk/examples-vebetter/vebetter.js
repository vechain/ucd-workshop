import { ProviderInternalBaseWallet, ThorClient, VeChainProvider } from "@vechain/sdk-network";
import { X2EarnRewardsPool } from "@vechain/vebetterdao-contracts"
import { Wallet as EthersWallet } from 'ethers';

import 'dotenv/config';

export async function rewardUser() {
    /** ----  Initiate ThorClient   ---- */
    const thor = ThorClient.at('https://testnet.vechain.org');

    /** ----  Master Wallet to sign transaction   ---- */
    const mnemonic = process.env.MNEMONIC;
    const prepWallet = EthersWallet.fromPhrase(mnemonic);
    const privateKey = prepWallet.privateKey.slice(2);
    const senderAddress = prepWallet.address.toLowerCase();

    /** ----  Define .getsigner() which requires
     * ProviderInternalBaseWallet() and VeChainProvider()   ---- */
    const wallet = new ProviderInternalBaseWallet(
    [{ privateKey: privateKey, address: senderAddress }]
    );

    const provider = new VeChainProvider(thor, wallet);

    const rootSigner = await provider.getSigner();

    /** ----  Call the VeBetter rewards contract   ---- */
    const x2EarnRewardsPoolContract = thor.contracts.load(
        X2EarnRewardsPool.address.testnet, 
        X2EarnRewardsPool.abi, 
        rootSigner)
        
    /** ----  Build transaction body   ---- */
    const tx = await x2EarnRewardsPoolContract.transact.distributeRewardWithProof(
    APP_ID,
    amount,
    receiverAddress,
    ["link", "image"],
    ["https://link-to-proof.com", "https://link-to-image.com/1.png"],
    ["waste_mass"],
    [100],
    "User performed a sustainable action on my app",
    )

    await tx.wait()
}
