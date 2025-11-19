import { ThorClient } from "@vechain/sdk-network";

export async function getAccountBalances(address, network = process.env.VECHAIN_NETWORK) {
  const thor = ThorClient.at(network);

  const account = await thor.accounts.getAccount(address);

  // Feel free to add logs, for example:
  console.log("You can add console logs here to debug your code, they'll show up in the terminal!");

  // Convert raw balances (in wei) to readable VET and VTHO
  const vetBalance = BigInt(account.balance) / 1000000000000000000n;
  const vthoBalance = BigInt(account.energy) / 1000000000000000000n;

  return {
    address,
    vet: vetBalance.toString(),
    vtho: vthoBalance.toString(),
  };
}