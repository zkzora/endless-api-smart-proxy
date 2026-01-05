# API Flow

This document describes how a Web2 action becomes an on-chain transaction.

## Use Case: Receipt Anchoring

### Step 1: Web2 Request

POST /v1/anchor/receipt
x-api-key: app_demo_key

Body:
- appId
- receipt payload

### Step 2: Smart-Proxy Processing

1. Validate API key
2. Validate payload schema
3. Canonicalize receipt JSON
4. Compute SHA-256 hash
5. Build Move transaction:
   <module_address>::receipt_anchor::anchor_receipt(app_id, order_id, receipt_hash_hex)
6. Sign + submit using relayer
7. Wait for confirmation (optional)

### Step 3: Smart-Proxy Response

Returns:
- receiptHash
- txHash
- explorerUrl

## Failure Handling

- 400 for validation errors
- 401 for invalid API keys
- 500 for chain/SDK failures (returns standardized error payload)

## Extensibility

Same flow can support:
- CMS publish proof
- audit log anchoring
- compliance record proofs
