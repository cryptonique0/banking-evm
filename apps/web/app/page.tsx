import { AccountCard } from '../components/AccountCard'
import { PortfolioSummary } from '../components/PortfolioSummary'
import { TransactionHistory } from '../components/TransactionHistory'

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <AccountCard />
      <PortfolioSummary />
      <TransactionHistory />
      <p className="opacity-80 text-sm">
        Connect your wallet to view balances and interact with DeFi protocols on Base and Celo.
      </p>
    </section>
  )
}