'use client'

import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import { base, baseSepolia, celo, celoAlfajores } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { http } from 'viem'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'be27afb93dbf1cb1993e227648f9ba8b'

const config = getDefaultConfig({
  appName: 'DeFi Bank',
  projectId,
  chains: [baseSepolia, base, celoAlfajores, celo],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
    [celo.id]: http('https://forno.celo.org'),
    [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
  },
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme({ borderRadius: 'medium' })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}