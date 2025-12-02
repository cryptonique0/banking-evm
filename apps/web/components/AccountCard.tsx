'use client'

import { useAccount, useBalance } from 'wagmi'
import { base, baseSepolia, celo, celoAlfajores } from 'wagmi/chains'

export function AccountCard() {
  const { address, chainId, isConnected } = useAccount()
  const { data } = useBalance({ address, chainId: chainId ?? baseSepolia.id })

  const getNetworkName = () => {
    if (chainId === base.id) return 'Base'
    if (chainId === baseSepolia.id) return 'Base Sepolia'
    if (chainId === celo.id) return 'Celo'
    if (chainId === celoAlfajores.id) return 'Celo Alfajores'
    return 'Unknown Network'
  }

  if (!isConnected) return <div className="p-4 rounded border border-white/10">Not connected</div>

  return (
    <div className="p-4 rounded border border-white/10 space-y-2">
      <div className="text-sm opacity-80">Network</div>
      <div className="font-mono text-sm">{getNetworkName()}</div>
      <div className="text-sm opacity-80 mt-2">Address</div>
      <div className="font-mono text-sm">{address}</div>
      <div className="text-sm opacity-80 mt-2">Native Balance</div>
      <div className="font-mono text-sm">{data ? `${data.formatted} ${data.symbol}` : '—'}</div>
    </div>
  )
}