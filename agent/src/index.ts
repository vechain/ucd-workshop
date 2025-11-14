import { character } from "./character.ts";

import { getAlias } from "../vechain/alias.js";
import { getAccountBalances } from "../vechain/account.js";
import { getLastTransfers } from "../vechain/transfers.js";

// extract 0x... address
function extractAddress(raw: string): string | null {
  const text = (raw || "").trim();
  const m =
    text.match(/\bbalance\s+(0x[a-fA-F0-9]{40})\b/i) ||
    text.match(/\b(0x[a-fA-F0-9]{40})\b/);
  return m ? m[1].replace(/[.,;:!?)]*$/g, "") : null;
}

/** 
 * VECHAIN TOOLING HANDLING STARTS HERE
 */
// Process VeChain Balances
const vechainBalanceAction: any = {
  name: "VECHAIN_WALLET_BALANCE",
  similes: ["VET_BALANCE", "CHECK_BALANCE", "BALANCE"],
  description: "Return VET and VTHO balances for a VeChain address",

  validate: async (_runtime: any, message: any) => {
    const text = message?.content?.text || "";
    const hasAddr = /\b0x[a-fA-F0-9]{40}\b/i.test(text);
    const hasKeyword = /\b(balance|vechain|vet|vtho)\b/i.test(text);
    return hasAddr || hasKeyword;
  },

  handler: async (_runtime: any, message: any, _state: any, _options: any, callback: any) => {
    const text = message?.content?.text || "";
    const address = extractAddress(text);

    if (!address) {
      await callback({ text: "Provide an address. Example: balance 0xYourWalletHere" });
      return true;
    }

    try {
      const { vet, vtho } = await getAccountBalances(address);
      await callback({
        text: `Balance for ${address}\nVET: ${vet}\nVTHO: ${vtho}`
      });
    } catch (e: any) {
      console.error("[balance error]", e?.message || e);
      await callback({ text: "Couldn't fetch balance right now. Try again shortly." });
    }

    return true;
  },

  examples: [
    [
      { user: "user", content: { text: "balance 0x01d6b50b31c18d7f81ede43935cadf79901b0ea0" } },
      { user: "assistant", content: { text: "Balance for 0x... VET: 123 VTHO: 4" } }
    ]
  ],
};

// Process VeChain VNS Alias
const vechainAliasAction: any = {
  name: "VECHAIN_WALLET_ALIAS",
  similes: ["ALIAS", "NAME", "IDENTITY"],
  description: "Return VeChain domain alias for a wallet address",

  validate: async (_runtime: any, message: any) => {
    const text = message?.content?.text || "";
    const hasAddr = /\b0x[a-fA-F0-9]{40}\b/i.test(text);
    const hasKeyword = /\b(alias|name|identity)\b/i.test(text);
    return hasAddr || hasKeyword;
  },

  handler: async (_runtime: any, message: any, _state: any, _options: any, callback: any) => {
    const text = message?.content?.text || "";
    const address = extractAddress(text);

    if (!address) {
      await callback({ text: "Provide an address. Example: alias 0xYourWalletHere" });
      return true;
    }

    try {
      const { alias } = await getAlias(address);
      await callback({
        text: alias ? `Alias for ${address}: ${alias}` : `No alias is registered for ${address}.`
      });
    } catch (e: any) {
      console.error("[alias error]", e?.message || e);
      await callback({ text: "Couldn't fetch alias right now. Try again shortly." });
    }

    return true;
  },

  examples: [
    [
      { user: "user", content: { text: "alias 0x9366662519dc456bd5b8bc4ee4b6852338d82f08" } },
      { user: "assistant", content: { text: "Alias for 0x... is example.vet" } }
    ]
  ],
};

// Process VeChain Transfers from a specific wallet
const vechainTransfersAction: any = {
  name: "VECHAIN_WALLET_TRANSFERS",
  similes: ["TRANSFERS", "TRANSFER", "LAST_TRANSFER"],
  description: "Return most recent transfers from a VeChain wallet address",

  validate: async (_runtime: any, message: any) => {
    const text = message?.content?.text || "";
    const hasAddr = /\b0x[a-fA-F0-9]{40}\b/i.test(text);
    const hasKeyword = /\b(transfers?|tx|transaction|last)\b/i.test(text);
    return hasAddr || hasKeyword;
  },

  handler: async (_runtime: any, message: any, _state: any, _options: any, callback: any) => {
    const text = message?.content?.text || "";
    const address = extractAddress(text);

    if (!address) {
      await callback({ text: "Provide an address. Example: transfers 0xYourWalletHere" });
      return true;
    }

    try {
      const tx = await getLastTransfers(address);
      if (!tx || tx.value === "0") {
        await callback({ text: `No transfers found for ${address}.` });
        return true;
      }

      await callback({
        text: `Last transfer from ${address}:\nFrom: ${tx.from}\nTo: ${tx.to}\nValue: ${tx.value} VET`
      });
    } catch (e: any) {
      console.error("[transfers error]", e?.message || e);
      await callback({ text: "Couldn't fetch transfers right now. Try again shortly." });
    }

    return true;
  },

  examples: [
    [
      { user: "user", content: { text: "transfers 0x9366662519dc456bd5b8bc4ee4b6852338d82f08" } },
      { user: "assistant", content: { text: "Last transfer from 0x...:\nFrom: 0x...\nTo: 0x...\nValue: 1.23 VET" } }
    ]
  ],
};

/** 
 * ADD STARGATE DEPOSITS HANDLER HERE 
*/

/** 
 * ADD STARGATE WITHDRAWALS HANDLER HERE 
*/

/** 
 * VECHAIN TOOLING HANDLING ENDS HERE
 */

// Mandatory init that registers the action
const initCharacter = ({ runtime }: { runtime: any }) => {
  console.log("Initializing character:", character?.name);
  runtime.registerAction(vechainBalanceAction);
  runtime.registerAction(vechainAliasAction);
  runtime.registerAction(vechainTransfersAction);
};

// Define agent and project with the exact shapes the loader looks for
export const projectAgent: any = {
  character,
  init: async (runtime: any) => await initCharacter({ runtime }),
};

export const project: any = {
  agents: [projectAgent], // <-- must be non-empty
};

// Export both a named and the default project to satisfy all loaders
export { character } from "./character.ts";
export default project;
