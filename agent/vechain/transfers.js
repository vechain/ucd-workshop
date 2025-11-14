import { ThorClient } from "@vechain/sdk-network";

export async function getLastTransfers(address, network = process.env.VECHAIN_NETWORK) {
  const thor = ThorClient.at(network);

  const transfers = await thor.logs.filterTransferLogs({
    criteriaSet: [{ sender: address }],
    range: { unit: "block", from: 20_000_000 },
    options: { limit: 1 },
    order: "desc",
  });
  
  const tx = transfers[0];

  return {
    from: address,
    to: tx.recipient,
    value: (BigInt(tx.amount) / 1000000000000000000n).toString(),
  };
}