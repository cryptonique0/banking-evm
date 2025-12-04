'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

export default function LendingPage() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, status } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const [mode, setMode] = useState<'deposit' | 'borrow'>('deposit')
  const [amount, setAmount] = useState('')
  const [borrowAmount, setBorrowAmount] = useState('')

  const handleDepositCollateral = () => {
    if (!amount || !isConnected) return
    writeContract({
      address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
      abi: [],
      functionName: 'depositETHCollateral',
      value: parseEther(amount),
    })
  }

  const handleBorrow = () => {
    if (!borrowAmount || !address || !isConnected) return
    writeContract({
      address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
      abi: [],
      functionName: 'createLoan',
      args: ['0x0000000000000000000000000000000000000000', parseEther(borrowAmount)],
    })
  }

  const submitting = status === 'pending' || isConfirming

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Lending & Borrowing</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('deposit')}
          className={`px-4 py-2 rounded font-medium transition ${
            mode === 'deposit' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Deposit Collateral
        </button>
        <button
          onClick={() => setMode('borrow')}
          className={`px-4 py-2 rounded font-medium transition ${
            mode === 'borrow' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Borrow
        </button>
      </div>

      <div className="p-6 rounded border border-white/10 space-y-4">
        {mode === 'deposit' ? (
          <>
            <div>
              <label className="block text-sm opacity-80 mb-2">Deposit Amount (ETH)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
              />
              <p className="text-xs opacity-60 mt-2">Use this as collateral to borrow tokens</p>
            </div>
            <button
              onClick={handleDepositCollateral}
              disabled={!isConnected || submitting || !amount}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium transition"
            >
              {submitting ? 'Depositing...' : 'Deposit Collateral'}
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm opacity-80 mb-2">Borrow Amount (Tokens)</label>
              <input
                type="text"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
              />
              <p className="text-xs opacity-60 mt-2">Requires 150% collateral (5% interest)</p>
            </div>
            <button
              onClick={handleBorrow}
              disabled={!isConnected || submitting || !borrowAmount}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium transition"
            >
              {submitting ? 'Borrowing...' : 'Borrow'}
            </button>
          </>
        )}
        {hash && (
          <p className="text-sm opacity-80">
            Tx: <span className="font-mono text-xs">{hash.slice(0, 10)}...</span>
          </p>
        )}
      </div>
    </section>
  )
}
