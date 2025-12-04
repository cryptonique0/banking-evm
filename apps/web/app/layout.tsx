import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { ReactNode } from 'react'
import { WalletProvider } from '../providers/wallet'
import { Connect } from '../components/Connect'
import Link from 'next/link'

export const metadata = {
  title: 'DeFi Bank - Base & Celo',
  description: 'Decentralized banking on Base and Celo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex gap-4 items-center overflow-x-auto">
              <Link href="/" className="font-semibold whitespace-nowrap">DeFi Bank</Link>
              <Link href="/deposit" className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap">Deposit</Link>
              <Link href="/withdraw" className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap">Withdraw</Link>
              <Link href="/transfer" className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap">Transfer</Link>
              <Link href="/lending" className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap">Lending</Link>
              <Link href="/staking" className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap">Staking</Link>
            </div>
            <div>
              <Connect />
            </div>
          </nav>
          <main className="max-w-3xl mx-auto p-6">{children}</main>
        </WalletProvider>
      </body>
    </html>
  )
}