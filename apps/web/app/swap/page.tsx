'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

export default function SwapPage() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, status } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const [tokenIn, setTokenIn] = useState('ETH')
  const [tokenOut, setTokenOut] = useState('CELO')
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('0')
  const [slippage, setSlippage] = useState('0.5')

  const handleSwap = () => {
    if (!amountIn || !isConnected) return
    // Call AMM swap contract
    writeContract({
      address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
      abi: [],
      functionName: 'swap',
      args: ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000', parseEther(amountIn)],
    })
  }

  const estimateOutput = (amount: string) => {
    if (!amount) {
      setAmountOut('0')
      return
    }
    // Simplified estimation: 1:1 with slippage
    const estimate = parseFloat(amount) * (1 - parseFloat(slippage) / 100)
    setAmountOut(estimate.toFixed(6))
  }

  const handleAmountChange = (val: string) => {
    setAmountIn(val)
    estimateOutput(val)
  }

  const submitting = status === 'pending' || isConfirming

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Swap Tokens</h1>

      <div className="p-6 rounded border border-white/10 space-y-4">
        <div>
          <label className="block text-sm opacity-80 mb-2">From Token</label>
          <select
            value={tokenIn}
            onChange={(e) => setTokenIn(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
          >
            <option>ETH</option>
            <option>CELO</option>
            <option>USDC</option>
            <option>DAI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm opacity-80 mb-2">Amount In</label>
          <input
            type="text"
            value={amountIn}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="text-center">
          <button className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition text-sm">
            ⇅ Swap
          </button>
        </div>

        <div>
          <label className="block text-sm opacity-80 mb-2">To Token</label>
          <select
            value={tokenOut}
            onChange={(e) => setTokenOut(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
          >
            <option>CELO</option>
            <option>ETH</option>
            <option>USDC</option>
            <option>DAI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm opacity-80 mb-2">Amount Out</label>
          <input
            type="text"
            value={amountOut}
            disabled
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded opacity-60"
          />
        </div>

        <div>
          <label className="block text-sm opacity-80 mb-2">Slippage Tolerance (%)</label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => {
              setSlippage(e.target.value)
              estimateOutput(amountIn)
            }}
            step="0.1"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
          />
        </div>

        <button
          onClick={handleSwap}
          disabled={!isConnected || submitting || !amountIn}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium transition"
        >
          {submitting ? 'Swapping...' : 'Swap'}
        </button>

        {hash && (
          <p className="text-sm opacity-80">
            Tx: <span className="font-mono text-xs">{hash.slice(0, 10)}...</span>
          </p>
        )}
      </div>

      <div className="p-4 rounded border border-white/10 space-y-2 text-sm">
        <div className="flex justify-between opacity-80">
          <span>Price</span>
          <span>1 {tokenIn} ≈ {amountOut} {tokenOut}</span>
        </div>
        <div className="flex justify-between opacity-80">
          <span>Fee (0.3%)</span>
          <span>{(parseFloat(amountIn || '0') * 0.003).toFixed(6)} {tokenIn}</span>
        </div>
      </div>
    </section>
  )
}
