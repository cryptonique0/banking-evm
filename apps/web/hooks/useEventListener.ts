'use client'

import { useEffect, useState } from 'react'
import { useAccount, usePublicClient } from 'wagmi'

export interface TransactionEvent {
  hash: string
  type: 'Deposit' | 'Withdraw' | 'TransferInternal' | 'Swapped' | 'Staked' | 'LoanCreated' | 'LoanRepaid'
  amount: string
  token: string
  timestamp: number
  blockNumber: number
  from: string
  to?: string
}

export function useEventListener(contractAddress?: `0x${string}`) {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const [events, setEvents] = useState<TransactionEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      if (!address || !publicClient || !contractAddress) return

      setIsLoading(true)
      try {
        // Fetch deposit events
        const depositLogs = await publicClient.getLogs({
          address: contractAddress,
          event: {
            type: 'event',
            name: 'Deposit',
            inputs: [
              { indexed: true, name: 'user', type: 'address' },
              { indexed: true, name: 'token', type: 'address' },
              { indexed: false, name: 'amount', type: 'uint256' },
            ],
          },
          args: { user: address },
          fromBlock: 'earliest',
          toBlock: 'latest',
        })

        const formattedEvents: TransactionEvent[] = depositLogs.map((log: any) => ({
          hash: log.transactionHash,
          type: 'Deposit',
          amount: log.args.amount?.toString() || '0',
          token: log.args.token || 'unknown',
          timestamp: Date.now(),
          blockNumber: Number(log.blockNumber),
          from: log.address,
          to: address,
        }))

        // Load from localStorage as fallback
        const stored = localStorage.getItem(`events_${address}`)
        if (stored) {
          const storedEvents = JSON.parse(stored)
          setEvents([...formattedEvents, ...storedEvents].slice(0, 100))
        } else {
          setEvents(formattedEvents)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
        // Fallback to localStorage
        const stored = localStorage.getItem(`events_${address}`)
        if (stored) setEvents(JSON.parse(stored))
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [address, publicClient, contractAddress])

  const addEvent = (event: TransactionEvent) => {
    if (!address) return
    const updated = [event, ...events].slice(0, 100)
    setEvents(updated)
    localStorage.setItem(`events_${address}`, JSON.stringify(updated))
  }

  return { events, isLoading, addEvent }
}
