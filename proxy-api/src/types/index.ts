export type NetworkName = "testnet" | "mainnet" | "devnet";

export interface ReceiptPayload {
  orderId: string;
  amount?: number;
  currency?: string;
  timestamp?: number;
  items?: Array<{ sku: string; qty: number; price?: number }>;
  [k: string]: unknown;
}

export interface AnchorReceiptRequestBody {
  appId: string;
  receipt: ReceiptPayload;
}

export interface AnchorReceiptResponse {
  ok: boolean;
  appId?: string;
  orderId?: string;
  receiptHash?: string;
  txHash?: string;
  explorerUrl?: string;
  error?: string;
  detail?: string;
}
