# DeFi Bank - Multi-Chain Banking Protocol

A fully decentralized banking dApp built on Base and Celo blockchains with advanced DeFi features.

## 🚀 Features

### Core Banking
- 🔐 **No Identity Verification** - Fully on-chain, Web3-native banking
- 💰 **Native Token Support** - Deposit, withdraw, and transfer ETH/CELO
- 🪙 **ERC20 Token Support** - Manage any ERC20 token
- 🔄 **Internal Transfers** - Transfer between users without gas costs

### DeFi Protocols
- 💸 **Lending & Borrowing** - Borrow against collateral with 5% interest
- 🎯 **Staking** - Earn 10% annual rewards on staked assets
- 📊 **Portfolio Analytics** - Real-time balance and rewards tracking
- 📜 **Transaction History** - Complete on-chain activity log

### Infrastructure
- 🌉 **Multi-Chain** - Supports Base (L2) and Celo networks
- 🔌 **WalletConnect v2** - Connect with any wallet via RainbowKit
- ⚡ **Low Fees** - Leverage L2 scaling for minimal transaction costs
- 🔒 **Secure** - Built with OpenZeppelin audited contracts

## Quick Start

```bash
git clone https://github.com/cryptonique0/banking-evm.git
cd banking-evm
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + wagmi + viem + RainbowKit
- **Smart Contracts**: Solidity 0.8.24 + Hardhat + OpenZeppelin + TypeChain
- **Networks**: Base (Ethereum L2) + Celo
- **Testing**: Hardhat + Chai + Mocha

## Smart Contracts

### DeBank.sol
Core banking contract with deposit, withdraw, and internal transfer functionality.

### DeBankLending.sol
Lending protocol with:
- Collateralized borrowing (150% collateral ratio)
- 5% annual interest rate
- ETH/ERC20 support
- Automatic liquidation protection

### DeBankStaking.sol
Staking protocol with:
- 10% annual rewards
- Native and ERC20 token support
- Time-weighted rewards calculation
- Flexible stake/unstake

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
