import { Address, parseEther } from 'viem'
import { publicClient } from './client'

export interface DepositParams {
  token: Address
  amount: string
}

export interface WithdrawParams {
  token: Address
  amount: string
  to: Address
}

export interface TransferParams {
  token: Address
  to: Address
  amount: string
}

export interface LoanParams {
  token: Address
  principal: string
}

export interface StakeParams {
  token: Address
  amount: string
}

// Utility to format amounts for transactions
export const formatAmount = (amount: string, decimals = 18) => {
  return parseEther(amount)
}

// Utility to read contract data
export const readContractData = async (
  contractAddress: Address,
  functionName: string,
  args: unknown[]
) => {
  try {
    // This would use publicClient.readContract in production
    // For now, it's a placeholder for contract interactions
    return null
  } catch (error) {
    console.error(`Error reading contract data: ${error}`)
    return null
  }
}

// Get user balance for a token
export const getUserBalance = async (
  userAddress: Address,
  contractAddress: Address,
  token: Address
) => {
  try {
    // This would fetch balance from contract
    return null
  } catch (error) {
    console.error(`Error getting user balance: ${error}`)
    return null
  }
}

// Get pending rewards
export const getPendingRewards = async (
  userAddress: Address,
  stakingContractAddress: Address,
  token: Address
) => {
  try {
    // This would fetch rewards from contract
    return null
  } catch (error) {
    console.error(`Error getting rewards: ${error}`)
    return null
  }
}

// Validate loan feasibility
export const validateLoan = (
  borrowAmount: string,
  collateralAmount: string
): { valid: boolean; reason?: string } => {
  const borrow = parseFloat(borrowAmount)
  const collateral = parseFloat(collateralAmount)

  // 150% collateral requirement
  const requiredCollateral = (borrow * 150) / 100

  if (collateral < requiredCollateral) {
    return {
      valid: false,
      reason: `Insufficient collateral. Required: ${requiredCollateral} ETH, Have: ${collateral} ETH`,
    }
  }

  return { valid: true }
}

// Calculate interest on loan
export const calculateLoanInterest = (
  principal: string,
  timeDaysElapsed: number,
  interestRate = 5
): string => {
  const p = parseFloat(principal)
  const interest = (p * interestRate * timeDaysElapsed) / 365
  return interest.toFixed(6)
}

// Calculate staking rewards
export const calculateStakingRewards = (
  stakedAmount: string,
  daysPassed: number,
  annualRate = 10
): string => {
  const amount = parseFloat(stakedAmount)
  const rewards = (amount * annualRate * daysPassed) / 365
  return rewards.toFixed(6)
}
