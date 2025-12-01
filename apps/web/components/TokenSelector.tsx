'use client'

import { Address } from 'viem'
import { NATIVE_TOKEN } from '../lib/contracts'

export type TokenOption = { address: Address; symbol: string }

export function TokenSelector({ tokens, value, onChange }: { tokens: TokenOption[]; value: Address; onChange?: (addr: Address) => void }) {
  return (
    <select
      className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none focus:border-white/30"
      value={value}
      onChange={(e) => onChange?.(e.target.value as Address)}
    >
      {tokens.map((t) => (
        <option key={t.address} value={t.address}>
          {t.symbol}{t.address === NATIVE_TOKEN ? ' (Native)' : ''}
        </option>
      ))}
    </select>
  )
}'use client'

import { useState } from 'react'
import type { Address } from 'viem'
import { NATIVE_TOKEN } from '../lib/contracts'
import { clsx } from 'clsx'

export function TokenSelector({ token, onChange }: { token: Address; onChange: (addr: Address) => void }) {
  const [mode, setMode] = useState(token === NATIVE_TOKEN ? 'native' : 'erc20')
  const [erc20, setErc20] = useState(token === NATIVE_TOKEN ? '' : (token as string))

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            setMode('native')
            onChange(NATIVE_TOKEN)
          }}
          className={clsx('px-3 py-1 rounded text-sm border', mode === 'native' ? 'border-white' : 'border-white/20 opacity-70')}
        >
          Native (ETH)
        </button>
        <button
          type="button"
          onClick={() => setMode('erc20')}
          className={clsx('px-3 py-1 rounded text-sm border', mode === 'erc20' ? 'border-white' : 'border-white/20 opacity-70')}
        >
          ERC20
        </button>
      </div>
      {mode === 'erc20' && (
        <input
          value={erc20}
          onChange={(e) => {
            setErc20(e.target.value)
            if (e.target.value.length === 42) onChange(e.target.value as Address)
          }}
          placeholder="Token contract address (0x...)"
          className="w-full bg-transparent border border-white/20 rounded px-3 py-2 outline-none"
        />
      )}
    </div>
  )
}