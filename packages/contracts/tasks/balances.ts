import { task } from 'hardhat/config'

task('balances', 'Query user balance in DeBank')
  .addParam('contract', 'DeBank contract address')
  .addParam('user', 'User address')
  .addParam('token', 'Token address (use 0x0 for native ETH)')
  .setAction(async (taskArgs, hre) => {
    const deBank = await hre.ethers.getContractAt('DeBank', taskArgs.contract)
    const balance = await deBank.balanceOf(taskArgs.user, taskArgs.token)
    console.log(`Balance: ${hre.ethers.formatEther(balance)} (${taskArgs.token})`)
  })
