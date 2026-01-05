# Endless Smart-Proxy for Web2 Legacy Applications

Endless Smart-Proxy is a Web2-first infrastructure layer that enables existing
applications to interact with the Endless L1 blockchain without requiring
blockchain knowledge, wallets, or native tokens.

Web2 systems communicate through standard REST APIs.
The proxy handles transaction creation, signing, gas payment,
and interaction with Move smart modules on Endless.

This project focuses on lowering the entry barrier for Web2 developers
and accelerating real-world adoption of Endless.

---

## Problem Statement

Web2 developers want to leverage blockchain properties such as:
- Immutability
- Verifiable proofs
- Transparent audit trails

However, adoption is blocked by:
- Learning Move and blockchain architecture
- Wallet and private key management
- Gas fees and transaction lifecycle
- Blockchain-specific tooling

As a result, most Web2 applications never reach on-chain systems.

---

## Solution Overview

The Endless Smart-Proxy acts as a translation and execution layer.

Web2 applications:
- Send HTTP requests
- Authenticate using API keys
- Never interact with wallets or tokens

The Smart-Proxy:
- Validates requests
- Hashes and canonicalizes data
- Sponsors gas using a relayer wallet
- Submits Move transactions to Endless
- Returns transaction proofs to Web2

This enables seamless Web2 → Web3 integration.

---

## High-Level Architecture

Web2 App
  |
  | HTTP / JSON
  v
Endless Smart-Proxy
  - API authentication
  - Data hashing
  - Gas abstraction
  - Transaction submission
  |
  | Move transaction
  v
Endless L1 Network

---

## Core API Flow (Receipt Anchoring Example)

### 1. Web2 Application Request

POST /v1/anchor/receipt

Headers:




