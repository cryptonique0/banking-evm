import { createPublicClient, http } from 'viem'
import { base, baseSepolia, celo, celoAlfajores } from 'wagmi/chains'

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})

// Helper to get client for specific chain
export const getClientForChain = (chainId: number) => {
  let chain = baseSepolia
  if (chainId === base.id) chain = base
  if (chainId === celo.id) chain = celo
  if (chainId === celoAlfajores.id) chain = celoAlfajores

  return createPublicClient({
    chain,
    transport: http(),
  })
}
