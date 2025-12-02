# Base DeFi Bank

A fully decentralized banking dApp built on Base and Celo blockchains with WalletConnect integration.

## Features

- 🔐 **No Identity Verification** - Fully on-chain, Web3-native banking
- 💰 **Native Token Support** - Deposit, withdraw, and transfer ETH/CELO
- 🪙 **ERC20 Token Support** - Manage any ERC20 token
- 🔄 **Internal Transfers** - Transfer between users without gas costs
- 🌉 **Multi-Chain** - Supports Base (L2) and Celo networks
- 🔌 **WalletConnect v2** - Connect with any wallet via RainbowKit

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
- **Networks**: Base (Ethereum L2) + Celo

## Supported Networks

| Network | Chain ID | Type | RPC |
|---------|----------|------|-----|
| Base Sepolia | 84532 | Testnet | Public |
| Base | 8453 | Mainnet | Public |
| Celo Alfajores | 44787 | Testnet | https://alfajores-forno.celo-testnet.org |
| Celo | 42220 | Mainnet | https://forno.celo.org |

## Deploy Contracts

```bash
cd packages/contracts

# Base networks
npm run deploy:sepolia      # Deploy to Base Sepolia testnet
npm run deploy:base         # Deploy to Base mainnet

# Celo networks
npm run deploy:celo-testnet # Deploy to Celo Alfajores testnet
npm run deploy:celo         # Deploy to Celo mainnet
```

## License

MIT
