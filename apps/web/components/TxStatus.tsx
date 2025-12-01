'use client'

export function TxStatus({ hash, error, loading }: { hash?: string; error?: string; loading?: boolean }) {
  if (loading) return <div className="text-sm opacity-80">Transaction pending...</div>
  if (error) return <div className="text-sm text-red-400">Error: {error}</div>
  if (hash) return (
    <div className="text-sm opacity-80">
      Sent: <span className="font-mono break-all">{hash}</span>
    </div>
  )
  return null
}'use client'

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