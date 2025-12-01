'use client'

import { useState } from 'react'
import { Address, parseEther, isAddress } from 'viem'
import { AmountInput } from '../../components/AmountInput'
import { TokenSelector, TokenOption } from '../../components/TokenSelector'
import { TxStatus } from '../../components/TxStatus'
import { useWithdraw, NATIVE_TOKEN } from '../../lib/debank'

const TOKENS: TokenOption[] = [
  { address: NATIVE_TOKEN, symbol: 'ETH' },
]

export default function WithdrawPage() {
  const [token, setToken] = useState<Address>(NATIVE_TOKEN)
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('')

  const { hash, error, isPending, withdrawEth, withdrawToken } = useWithdraw()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !isAddress(to as Address)) return
    const wei = parseEther(amount)
    if (token === NATIVE_TOKEN) await withdrawEth(wei, to as Address)
    else await withdrawToken(token, wei, to as Address)
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Withdraw</h1>
      <form onSubmit={onSubmit} className="space-y-3 max-w-md">
        <TokenSelector tokens={TOKENS} value={token} onChange={setToken} />
        <AmountInput value={amount} onChange={setAmount} />
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Recipient address" className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none focus:border-white/30" />
        <button disabled={isPending} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50" type="submit">
          {isPending ? 'Submitting...' : 'Withdraw'}
        </button>
      </form>
      <TxStatus loading={isPending} hash={hash} error={error?.message} />
    </section>
  )
}"use client"

import { useState } from 'react'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import type { Address } from 'viem'
import { parseEther, parseUnits } from 'viem'
import { deBank, NATIVE_TOKEN } from '../../lib/contracts'
import { deBankAbi } from '../../lib/abi'
import { TokenSelector } from '../../components/TokenSelector'
import { AmountInput } from '../../components/AmountInput'
import { TxStatus } from '../../components/TxStatus'

export default function WithdrawPage() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, status, error } = useWriteContract()
  const { status: waitStatus } = useWaitForTransactionReceipt({ hash })

  const submitting = status === 'pending' || waitStatus === 'pending'
  const [token, setToken] = useState<Address>(NATIVE_TOKEN)
  const [amount, setAmount] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConnected || !address || !amount) return
    if (token === NATIVE_TOKEN) {
      writeContract({ address: deBank.address as `0x${string}`, abi: deBankAbi, functionName: 'withdrawETH', args: [parseEther(amount), address], chainId: deBank.chainId })
      return
    }
    const amt = parseUnits(amount, 18)
    writeContract({ address: deBank.address as `0x${string}`, abi: deBankAbi, functionName: 'withdrawToken', args: [token, amt, address], chainId: deBank.chainId })
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Withdraw</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <div className="text-sm mb-1 opacity-80">Token</div>
          <TokenSelector token={token} onChange={setToken} />
        </div>
        <div>
          <div className="text-sm mb-1 opacity-80">Amount</div>
          <AmountInput value={amount} onChange={setAmount} />
        </div>
        <button disabled={!isConnected || submitting || !amount} className="px-4 py-2 rounded bg-white text-black disabled:opacity-50">
          {submitting ? 'Submitting…' : 'Withdraw'}
        </button>
        <TxStatus status={waitStatus === 'success' ? 'success' : status === 'pending' || waitStatus === 'pending' ? 'pending' : error ? 'error' : 'idle'} hash={hash as string | undefined} error={error?.message} />
      </form>
    </section>
  )
}