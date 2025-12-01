import { task } from 'hardhat/config'

task('balances', 'Get user/token balance')
  .addParam('user', 'User address')
  .addParam('token', 'Token address (0x0 for native)')
  .setAction(async (args, hre) => {
    const debank = await hre.ethers.getContract('DeBank')
    const bal = await debank.balanceOf(args.user, args.token)
    console.log('Balance:', bal.toString())
  })
