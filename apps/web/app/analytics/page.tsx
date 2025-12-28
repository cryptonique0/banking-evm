'use client'

import { useAccount } from 'wagmi'
import { useEventListener } from '../../hooks/useEventListener'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockChartData = [
  { day: 'Mon', volume: 4000, tvl: 2400, fees: 240 },
  { day: 'Tue', volume: 3000, tvl: 1398, fees: 221 },
  { day: 'Wed', volume: 2000, tvl: 9800, fees: 229 },
  { day: 'Thu', volume: 2780, tvl: 3908, fees: 200 },
  { day: 'Fri', volume: 1890, tvl: 4800, fees: 221 },
  { day: 'Sat', volume: 2390, tvl: 3800, fees: 250 },
  { day: 'Sun', volume: 3490, tvl: 4300, fees: 210 },
]

export default function AnalyticsPage() {
  const { address } = useAccount()
  const { events, isLoading } = useEventListener()

  const calculateStats = () => {
    const totalEvents = events.length
    const depositEvents = events.filter((e) => e.type === 'Deposit').length
    const swapEvents = events.filter((e) => e.type === 'Swapped').length
    const totalVolume = events.reduce((sum, e) => sum + parseFloat(e.amount || '0'), 0)

    return {
      totalEvents,
      depositEvents,
      swapEvents,
      totalVolume: totalVolume.toFixed(2),
    }
  }

  const stats = calculateStats()

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded border border-white/10">
          <div className="text-sm opacity-80 mb-2">Total Events</div>
          <div className="text-3xl font-bold">{stats.totalEvents}</div>
          <div className="text-xs opacity-60 mt-1">transactions</div>
        </div>

        <div className="p-4 rounded border border-white/10">
          <div className="text-sm opacity-80 mb-2">Deposits</div>
          <div className="text-3xl font-bold">{stats.depositEvents}</div>
          <div className="text-xs opacity-60 mt-1">total deposits</div>
        </div>

        <div className="p-4 rounded border border-white/10">
          <div className="text-sm opacity-80 mb-2">Swaps</div>
          <div className="text-3xl font-bold">{stats.swapEvents}</div>
          <div className="text-xs opacity-60 mt-1">swap txs</div>
        </div>

        <div className="p-4 rounded border border-white/10">
          <div className="text-sm opacity-80 mb-2">Total Volume</div>
          <div className="text-3xl font-bold">{stats.totalVolume}</div>
          <div className="text-xs opacity-60 mt-1">tokens traded</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Volume & TVL</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="volume" fill="#3b82f6" />
              <Bar dataKey="tvl" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Fees Generated</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="fees" stroke="#f59e0b" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Events */}
      <div className="p-4 rounded border border-white/10 space-y-3">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        {isLoading ? (
          <div className="text-sm opacity-60">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-sm opacity-60">No events yet</div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.slice(0, 10).map((event, i) => (
              <div key={i} className="p-2 rounded bg-white/5 flex justify-between text-sm">
                <span>{event.type}</span>
                <span className="opacity-60">{event.amount} {event.token}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
