import { ThorClient } from "@vechain/sdk-network";
const thor = ThorClient.at("https://mainnet.vechain.org");

const bestBlock = await thor.blocks.getBestBlockCompressed();

console.log("Best Block:", bestBlock?.number, bestBlock?.id);
