import { ThorClient, vnsUtils } from "@vechain/sdk-network";

export async function getAlias(address, network = process.env.VECHAIN_NETWORK) {
  const thor = ThorClient.at(network);

  const alias = await vnsUtils.lookupAddress(thor, address.toLowerCase());

  return {
    address,
    alias: alias,
  };
}
