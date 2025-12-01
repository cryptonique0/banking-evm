# Base DeFi Bank (Monorepo)

A decentralized banking dApp on Base with wallet connection (RainbowKit + WalletConnect), built with Next.js and Hardhat.

- Frontend: `apps/web` (Next.js 14, TypeScript, Tailwind, wagmi + viem + RainbowKit)
- Smart contracts: `packages/contracts` (Hardhat, Solidity 0.8.24)

## Prerequisites
- Node.js 18+
- npm, pnpm, or yarn

## Setup
1. Copy environment examples and fill values

cp apps/web/.env.example apps/web/.env.local
cp packages/contracts/.env.example packages/contracts/.env

2. Install dependencies (from repo root)

npm install

3. WalletConnect setup

Create a WalletConnect Cloud project and set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in `apps/web/.env.local`. See https://docs.walletconnect.network/ for details.

## Development
- Run frontend: `npm run dev`
- Build all: `npm run build`

## Deploy contracts
From `packages/contracts`:

npm run compile
npm run deploy:sepolia

This writes the deployed address and ABI to `apps/web/contracts/deBank.json` for the frontend.

## Notes
- Default chain is Base Sepolia; switch to Base mainnet for production.
- No identity verification; all actions occur directly on-chain.
 - RainbowKit is configured with WalletConnect per the official docs; set a valid project ID.
