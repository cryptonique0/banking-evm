'use client'

export function TxStatus({ status, hash, error }: { status: 'idle' | 'pending' | 'success' | 'error'; hash?: string; error?: string }) {
  if (status === 'idle') return null
  if (status === 'pending') return <div className="text-sm opacity-80">Transaction pending...</div>
  if (status === 'success')
    return (
      <div className="text-sm text-green-400">
        Success{hash ? (
          <>
            {' '}
            <a target="_blank" className="underline" href={`https://basescan.org/tx/${hash}`}>View on explorer</a>
          </>
        ) : null}
      </div>
    )
  return <div className="text-sm text-red-400">Error{error ? `: ${error}` : ''}</div>
}