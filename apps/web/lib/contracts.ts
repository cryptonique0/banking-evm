import type { Address } from 'viem'

export const NATIVE_TOKEN: Address = '0x0000000000000000000000000000000000000000'

export type DeBankConfig = {
  address: Address
  chainId: number
  abi: any
}

// This file will be overwritten by the deployment script.
// Provide a fallback for local development.
export const deBank: DeBankConfig = {
  address: '0x0000000000000000000000000000000000000000',
  chainId: Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || 84532),
  abi: [],
}
