"use client"

import { useState } from 'react'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import type { Address } from 'viem'
import { parseEther, parseUnits } from 'viem'
import { deBank, NATIVE_TOKEN } from '../../lib/contracts'
import { deBankAbi, erc20Abi } from '../../lib/abi'
import { TokenSelector } from '../../components/TokenSelector'
import { AmountInput } from '../../components/AmountInput'
import { TxStatus } from '../../components/TxStatus'

export default function DepositPage() {
  const { isConnected } = useAccount()
  const approve = useWriteContract()
  const deposit = useWriteContract()
  const { status: approveWait } = useWaitForTransactionReceipt({ hash: approve.data })
  const { status: depositWait } = useWaitForTransactionReceipt({ hash: deposit.data })

  const submitting = approve.status === 'pending' || deposit.status === 'pending' || approveWait === 'pending' || depositWait === 'pending'

  const [token, setToken] = useState<Address>(NATIVE_TOKEN)
  const [amount, setAmount] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConnected || !amount) return
    if (token === NATIVE_TOKEN) {
      deposit.writeContract({ address: deBank.address as `0x${string}`, abi: deBankAbi, functionName: 'depositETH', value: parseEther(amount), chainId: deBank.chainId })
      return
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <div className="text-sm mb-1 opacity-80">Token</div>
          <TokenSelector token={token} onChange={setToken} />
        </div>
        <div>
          <div className="text-sm mb-1 opacity-80">Amount</div>
          <AmountInput value={amount} onChange={setAmount} />
        </div>
        {token !== NATIVE_TOKEN ? (
          <div className="flex gap-3">
            <button
              type="button"
              disabled={!isConnected || submitting || !amount}
              onClick={() => {
                const amt = parseUnits(amount || '0', 18)
                approve.writeContract({ address: token as `0x${string}`, abi: erc20Abi, functionName: 'approve', args: [deBank.address as `0x${string}`, amt], chainId: deBank.chainId })
              }}
              className="px-4 py-2 rounded bg-white text-black disabled:opacity-50"
            >
              {approve.status === 'pending' || approveWait === 'pending' ? 'Approving…' : 'Approve'}
            </button>
            <button
              type="button"
              disabled={!isConnected || submitting || !amount || approveWait !== 'success'}
              onClick={() => {
                const amt = parseUnits(amount || '0', 18)
                deposit.writeContract({ address: deBank.address as `0x${string}`, abi: deBankAbi, functionName: 'depositToken', args: [token, amt], chainId: deBank.chainId })
              }}
              className="px-4 py-2 rounded bg-white text-black disabled:opacity-50"
            >
              {deposit.status === 'pending' || depositWait === 'pending' ? 'Depositing…' : 'Deposit'}
            </button>
          </div>
        ) : (
          <button disabled={!isConnected || submitting || !amount} className="px-4 py-2 rounded bg-white text-black disabled:opacity-50">
            {submitting ? 'Submitting…' : 'Deposit'}
          </button>
        )}
        <TxStatus
          status={
            depositWait === 'success'
              ? 'success'
              : submitting
              ? 'pending'
              : approve.error || deposit.error
              ? 'error'
              : 'idle'
          }
          hash={(deposit.data || approve.data) as string | undefined}
          error={approve.error?.message || deposit.error?.message}
        />
      </form>
    </section>
  )
}