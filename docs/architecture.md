# Endless Smart-Proxy Architecture

This document describes the technical architecture of the Endless Smart-Proxy
and how it bridges Web2 legacy applications with the Endless L1 blockchain.

The architecture is designed to minimize friction for Web2 developers
while preserving the security and immutability guarantees of blockchain systems.

---

## Design Goals

1. Web2-first developer experience
2. No wallet or token requirement for end users
3. Gas abstraction and transaction sponsorship
4. Clear separation between Web2 logic and blockchain execution
5. Scalable onboarding of existing applications

---

## High-Level Architecture Overview

The system is composed of three main layers:

1. Web2 Application Layer
2. Smart-Proxy Layer
3. Endless L1 Blockchain Layer

Each layer has a clear responsibility and minimal coupling.

---

## 1. Web2 Application Layer

This layer includes existing systems such as:
- E-commerce platforms
- Point-of-sale (POS) systems
- Content management systems (CMS)
- Backend services and APIs

Characteristics:
- No blockchain-specific logic
- No wallet or key management
- Uses standard HTTP requests
- Authenticates using API keys

The Web2 application treats the Smart-Proxy as a regular backend service.

---

## 2. Smart-Proxy Layer

The Smart-Proxy is the core component of the system.

Responsibilities:
- API authentication and request validation
- Canonicalization of input data
- Hash generation for immutable proofs
- Transaction construction and signing
- Gas fee sponsorship via relayer wallet
- Communication with Endless L1 via SDK

The Smart-Proxy abstracts all blockchain complexity
and exposes simple REST endpoints to Web2 applications.

### Internal Components

- API Gateway  
  Handles routing, authentication, and rate limiting.

- Hash Service  
  Canonicalizes JSON payloads and generates deterministic hashes.

- Endless Service  
  Builds and submits Move transactions using the Endless SDK.

- Relayer Account  
  A managed wallet used to sign transactions and pay gas fees.

---

## 3. Endless L1 Blockchain Layer

This layer consists of:
- Endless L1 network
- Move smart modules deployed by the application owner

Responsibilities:
- Persist immutable proofs
- Emit verifiable on-chain events
- Provide finality and auditability

The blockchain layer does not interact directly with Web2 applications.
All interactions are mediated by the Smart-Proxy.

---

## Transaction Ownership Model

- Transactions are submitted by the Smart-Proxy relayer
- End users do not own or manage wallets
- Application owners control relayer funding and limits

This model is suitable for:
- Enterprise systems
- High-throughput Web2 workloads
- Gradual Web3 adoption

---

## Security Considerations

- API keys are scoped per application
- No private keys are exposed to Web2 clients
- Input data is validated before transaction submission
- On-chain logic is minimal and deterministic

This architecture reduces the attack surface
while maintaining blockchain guarantees.

---

## Scalability Considerations

- Stateless REST APIs allow horizontal scaling
- Relayer wallets can be sharded or rotated
- Multiple applications can share the same proxy infrastructure
- Supports batching and async transaction handling

---

## Summary

The Endless Smart-Proxy architecture enables
a clean separation between Web2 systems and blockchain execution.

It allows Endless to function as an infrastructure layer
for mass adoption rather than a niche developer platform.
