import { character } from "./character.ts";

import { getAlias } from "./vechain/alias.js";
import { getAccountBalances } from "./vechain/account.js";
import { getLastTransfer } from "./vechain/transfers.js";
import { getLastStargateDeposit } from "./vechain/stargateDeposits.js";
import { getLastStargateWithdrawal } from "./vechain/stargateWithdrawals.js";

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

// Return VET and VTHO balances for a VeChain account
const vechainBalanceAction: any = {
  name: "VECHAIN_WALLET_BALANCE",
  similes: ["VET_BALANCE", "CHECK_BALANCE", "BALANCE"],
  description: "Return VET and VTHO balances for a VeChain account",

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
      { user: "user", content: { text: "balance 0xFE10bbff63c5730F698a1D55EA44030Fb462Bbf3" } },
      { user: "assistant", content: { text: "Balance for 0x... VET: 123 VTHO: 4" } }
    ]
  ],
};

// Return VeChain VNS alias for a VeChain account
// TODO: Implement the `vechainAliasAction` for challenge #2

// Return latest transfer for a VeChain account
// TODO: Implement the `vechainTransferAction` for challenge #3

// Return latest stargate deposit for a VeChain account
// TODO: Implement the `vechainStargateDepositsAction` for challenge #4

// Return latest stargate withdrawal for a VeChain account
// TODO: Implement the `vechainStargateWithdrawalsAction` for challenge #4

/** 
 * VECHAIN TOOLING HANDLING ENDS HERE
 */

// Mandatory init that registers the action
const initCharacter = ({ runtime }: { runtime: any }) => {
  console.log("Initializing character:", character?.name);
  runtime.registerAction(vechainBalanceAction);
  // TODO: Register the actions for challenges #2, #3 and #4 here
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
