'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

interface Transaction {
  hash: string
  type: 'deposit' | 'withdraw' | 'transfer' | 'borrow' | 'repay' | 'stake' | 'unstake'
  amount: string
  token: string
  timestamp: number
  status: 'pending' | 'success' | 'failed'
}

export function TransactionHistory() {
  const { address } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Load from localStorage
    if (address) {
      const stored = localStorage.getItem(`txs_${address}`)
      if (stored) {
        setTransactions(JSON.parse(stored))
      }
    }
  }, [address])

  const addTransaction = (tx: Transaction) => {
    if (!address) return
    const updated = [tx, ...transactions].slice(0, 50) // Keep last 50
    setTransactions(updated)
    localStorage.setItem(`txs_${address}`, JSON.stringify(updated))
  }

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-green-400'
      case 'withdraw':
        return 'text-red-400'
      case 'transfer':
        return 'text-blue-400'
      case 'borrow':
        return 'text-yellow-400'
      case 'repay':
        return 'text-purple-400'
      case 'stake':
        return 'text-cyan-400'
      case 'unstake':
        return 'text-orange-400'
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Recent Activity</h3>
      {transactions.length === 0 ? (
        <div className="p-4 rounded border border-white/10 text-center opacity-60">
          No transactions yet
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div
              key={i}
              className="p-3 rounded border border-white/10 flex items-center justify-between hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                  {tx.type.toUpperCase()}
                </div>
                <div>
                  <div className="text-sm opacity-80">{tx.amount} {tx.token}</div>
                  <div className="text-xs opacity-60">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono opacity-60">
                {tx.hash.slice(0, 10)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
