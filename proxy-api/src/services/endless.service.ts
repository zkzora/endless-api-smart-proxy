import { AnchorReceiptRequestBody } from "../types";

/**
 * NOTE:
 * SDK API can differ slightly by version.
 * Keep all Endless SDK interaction isolated here.
 */
type SubmitResult = { txHash: string };

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function normalizeNetwork(net: string): "testnet" | "mainnet" | "devnet" {
  const n = (net || "testnet").toLowerCase();
  if (n === "mainnet") return "mainnet";
  if (n === "devnet") return "devnet";
  return "testnet";
}

export async function submitAnchorReceiptTx(params: {
  appId: string;
  orderId: string;
  receiptHashHex: string; // "0x..."
}): Promise<SubmitResult> {
  const network = normalizeNetwork(process.env.NETWORK || "testnet");
  const relayerPk = requireEnv("RELAYER_PRIVATE_KEY");
  const moduleAddress = requireEnv("MODULE_ADDRESS");

  // Dynamic import so TypeScript builds even if SDK typings differ.
  // If your SDK uses slightly different names, you edit only here.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sdk = require("@endlesslab/endless-ts-sdk");

  // Common patterns in SDKs:
  // - new Endless(new EndlessConfig({ network: Network.TESTNET }))
  // - Account.fromPrivateKey({ privateKeyHex })
  const Network = sdk.Network;
  const Endless = sdk.Endless;
  const EndlessConfig = sdk.EndlessConfig;
  const Account = sdk.Account;

  const endless = new Endless(
    new EndlessConfig({
      network:
        network === "mainnet"
          ? Network.MAINNET
          : network === "devnet"
          ? Network.DEVNET
          : Network.TESTNET
    })
  );

  const relayer = Account.fromPrivateKey({ privateKeyHex: relayerPk });

  const functionId = `${moduleAddress}::receipt_anchor::anchor_receipt`;

  // Build tx payload
  const tx = await endless.transaction.build.simple({
    sender: relayer.accountAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: [params.appId, params.orderId, params.receiptHashHex]
    }
  });

  // Sign + submit
  const pending = await endless.signAndSubmitTransaction({
    signer: relayer,
    transaction: tx
  });

  // Optional: wait for finality
  if (typeof endless.waitForTransaction === "function") {
    await endless.waitForTransaction({ transactionHash: pending.hash });
  }

  return { txHash: pending.hash };
}

/**
 * Helper to compute explorer URL.
 */
export function makeExplorerUrl(txHash: string): string {
  const base = (process.env.EXPLORER_BASE || "https://scan.endless.link").replace(/\/+$/, "");
  return `${base}/tx/${txHash}`;
}
