'use client'

import { ReactNode, useMemo } from 'react'
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_ID'
const defaultChainId = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || baseSepolia.id)

const transports = {
  [base.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` : undefined),
  [baseSepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` : undefined),
}

const config = getDefaultConfig({
  appName: 'Base DeFi Bank',
  projectId,
  chains: [baseSepolia, base],
  transports: {
    [base.id]: transports[base.id],
    [baseSepolia.id]: transports[baseSepolia.id],
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
  const initialChain = useMemo(() => (defaultChainId === base.id ? base : baseSepolia), [])
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme({ borderRadius: 'medium' })} initialChain={initialChain}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}