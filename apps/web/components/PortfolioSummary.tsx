'use client'

import { useAccount, useBalance } from 'wagmi'
import { baseSepolia, base, celo, celoAlfajores } from 'wagmi/chains'

export function PortfolioSummary() {
  const { address, chainId } = useAccount()
  const { data: balance } = useBalance({ address, chainId })

  const getNetworkSymbol = (id?: number) => {
    switch (id) {
      case base.id:
        return 'ETH'
      case baseSepolia.id:
        return 'ETH'
      case celo.id:
        return 'CELO'
      case celoAlfajores.id:
        return 'CELO'
      default:
        return '—'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded border border-white/10">
        <div className="text-sm opacity-80 mb-2">Total Balance</div>
        <div className="text-2xl font-mono font-bold">
          {balance ? `${balance.formatted}` : '—'}
        </div>
        <div className="text-xs opacity-60 mt-1">{getNetworkSymbol(chainId)}</div>
      </div>

      <div className="p-4 rounded border border-white/10">
        <div className="text-sm opacity-80 mb-2">Deposits</div>
        <div className="text-2xl font-mono font-bold">—</div>
        <div className="text-xs opacity-60 mt-1">On-chain balance</div>
      </div>

      <div className="p-4 rounded border border-white/10">
        <div className="text-sm opacity-80 mb-2">Rewards</div>
        <div className="text-2xl font-mono font-bold">—</div>
        <div className="text-xs opacity-60 mt-1">Staking + Lending</div>
      </div>
    </div>
  )
}
