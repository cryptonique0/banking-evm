import { Address, erc20Abi, parseEther } from 'viem'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { deBank, NATIVE_TOKEN } from './contracts'

export function useDeposit() {
  const { chainId } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    receipt,
    depositEth: async (amountEth: string) => {
      const value = parseEther(amountEth)
      return writeContract({
        address: deBank.address,
        abi: deBank.abi,
        chainId: chainId ?? deBank.chainId,
        functionName: 'depositETH',
        value,
      })
    },
    depositErc20: async (token: Address, amount: bigint) => {
      // Caller must approve before invoking depositToken
      return writeContract({
        address: deBank.address,
        abi: deBank.abi,
        chainId: chainId ?? deBank.chainId,
        functionName: 'depositToken',
        args: [token, amount],
      })
    },
  }
}

export function useApproveErc20(token: Address) {
  const { chainId } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })
  return {
    hash,
    error,
    isPending,
    receipt,
    approve: (amount: bigint) =>
      writeContract({ address: token, abi: erc20Abi, chainId: chainId ?? deBank.chainId, functionName: 'approve', args: [deBank.address, amount] }),
  }
}

export function useWithdraw() {
  const { chainId } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })
  return {
    hash,
    error,
    isPending,
    receipt,
    withdrawEth: (amount: bigint, to: Address) =>
      writeContract({ address: deBank.address, abi: deBank.abi, chainId: chainId ?? deBank.chainId, functionName: 'withdrawETH', args: [amount, to] }),
    withdrawToken: (token: Address, amount: bigint, to: Address) =>
      writeContract({ address: deBank.address, abi: deBank.abi, chainId: chainId ?? deBank.chainId, functionName: 'withdrawToken', args: [token, amount, to] }),
  }
}

export function useTransferInternal() {
  const { chainId } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })
  return {
    hash,
    error,
    isPending,
    receipt,
    transferInternal: (token: Address, to: Address, amount: bigint) =>
      writeContract({ address: deBank.address, abi: deBank.abi, chainId: chainId ?? deBank.chainId, functionName: 'transferInternal', args: [token, to, amount] }),
  }
}

export { NATIVE_TOKEN }