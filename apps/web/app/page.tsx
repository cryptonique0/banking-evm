import { AccountCard } from '../components/AccountCard'

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <AccountCard />
      <p className="opacity-80 text-sm">
        Connect your wallet to view balances and interact with the DeBank smart contract on Base.
      </p>
    </section>
  )
}