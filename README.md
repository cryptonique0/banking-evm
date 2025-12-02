# Base DeFi Bank

A fully decentralized banking dApp built on Base blockchain with wallet connect integration.

## Features

- 🔐 **No Identity Verification** - Fully on-chain, Web3-native banking
- 💰 **Native ETH Support** - Deposit, withdraw, and transfer ETH
- 🪙 **ERC20 Token Support** - Manage any ERC20 token
- 🔄 **Internal Transfers** - Transfer between users without gas costs
- 🌉 **Base Network** - Built on Base (Ethereum L2) for low fees
- 🔌 **WalletConnect** - Connect with any wallet via RainbowKit

## Quick Start

```bash
git clone https://github.com/cryptonique0/banking-evm.git
cd banking-evm
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind + wagmi + RainbowKit
- **Contracts**: Solidity 0.8.24 + Hardhat + OpenZeppelin
- **Network**: Base (Ethereum L2)

## Deploy Contracts

```bash
cd packages/contracts
npm run deploy:sepolia  # Deploy to Base Sepolia testnet
```

## License

MIT
