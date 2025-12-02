import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
import './tasks/balances'

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY,
      chainId: 84532,
    },
    base: {
      url: process.env.BASE_MAINNET_RPC_URL || '',
      accounts: PRIVATE_KEY,
      chainId: 8453,
    },
  },
}

export default config