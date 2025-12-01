'use client'

import { useState } from 'react'

export function AmountInput({ value, onChange, placeholder = '0.0' }: { value?: string; onChange?: (v: string) => void; placeholder?: string }) {
  const [local, setLocal] = useState(value ?? '')
  return (
    <input
      className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 outline-none focus:border-white/30"
      inputMode="decimal"
      placeholder={placeholder}
      value={local}
      onChange={(e) => {
        setLocal(e.target.value)
        onChange?.(e.target.value)
      }}
    />
  )
}'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

export function AmountInput({ value, onChange, placeholder = '0.0' }: { value?: string; onChange: (v: string) => void; placeholder?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      inputMode="decimal"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      className={clsx(
        'w-full bg-transparent border rounded px-3 py-2 outline-none',
        focused ? 'border-white/60' : 'border-white/20'
      )}
    />
  )
}