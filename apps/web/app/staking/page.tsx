'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

export default function StakingPage() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, status } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const [mode, setMode] = useState<'stake' | 'unstake'>('stake')
  const [amount, setAmount] = useState('')
  const [estimatedReward, setEstimatedReward] = useState('0')

  const handleStake = () => {
    if (!amount || !isConnected) return
    writeContract({
      address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
      abi: [],
      functionName: 'stakeETH',
      value: parseEther(amount),
    })
  }

  const handleUnstake = () => {
    if (!amount || !isConnected || !address) return
    writeContract({
      address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
      abi: [],
      functionName: 'unstake',
      args: ['0x0000000000000000000000000000000000000000', parseEther(amount)],
    })
  }

  const updateRewardEstimate = (val: string) => {
    setAmount(val)
    if (val) {
      const estimate = (parseFloat(val) * 10) / 100 // 10% annual
      setEstimatedReward(estimate.toFixed(4))
    }
  }

  const submitting = status === 'pending' || isConfirming

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Staking</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('stake')}
          className={`px-4 py-2 rounded font-medium transition ${
            mode === 'stake' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => setMode('unstake')}
          className={`px-4 py-2 rounded font-medium transition ${
            mode === 'unstake' ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Unstake
        </button>
      </div>

      <div className="p-6 rounded border border-white/10 space-y-4">
        <div>
          <label className="block text-sm opacity-80 mb-2">Amount (ETH)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => updateRewardEstimate(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30"
          />
        </div>
        
        <div className="p-3 rounded bg-white/5 border border-white/10">
          <div className="flex justify-between text-sm">
            <span className="opacity-80">Est. Annual Reward (10%)</span>
            <span className="font-mono">{estimatedReward} ETH</span>
          </div>
        </div>

        <button
          onClick={mode === 'stake' ? handleStake : handleUnstake}
          disabled={!isConnected || submitting || !amount}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium transition"
        >
          {submitting ? (mode === 'stake' ? 'Staking...' : 'Unstaking...') : mode === 'stake' ? 'Stake' : 'Unstake'}
        </button>

        {hash && (
          <p className="text-sm opacity-80">
            Tx: <span className="font-mono text-xs">{hash.slice(0, 10)}...</span>
          </p>
        )}
      </div>
    </section>
  )
}
