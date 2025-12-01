'use client'

import { ReactNode, useMemo } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { createConfig, WagmiConfig, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { base, baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_ID'
const defaultChainId = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || baseSepolia.id)

const baseSepoliaRpc = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` : undefined
const baseMainnetRpc = process.env.NEXT_PUBLIC_BASE_MAINNET_RPC_URL || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` : undefined

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepolia, base],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === base.id) return { http: baseMainnetRpc || '' }
        if (chain.id === baseSepolia.id) return { http: baseSepoliaRpc || '' }
        return { http: '' }
      },
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({ appName: 'Base DeFi Bank', projectId, chains })

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
  const initialChain = useMemo(() => (defaultChainId === base.id ? base : baseSepolia), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme({ borderRadius: 'medium' })} initialChain={initialChain} chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}