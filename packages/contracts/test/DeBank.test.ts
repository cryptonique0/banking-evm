import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBank', () => {
  it('deposits and withdraws ETH', async () => {
    const [user] = await ethers.getSigners()
    const DeBank = await ethers.getContractFactory('DeBank')
    const debank = await DeBank.deploy()
    await debank.waitForDeployment()

    await expect(user.sendTransaction({ to: await debank.getAddress(), value: ethers.parseEther('1') }))
      .to.emit(debank, 'Deposit')

    expect(await debank.balanceOf(user.address, ethers.ZeroAddress)).to.equal(ethers.parseEther('1'))

    await expect(debank.connect(user).withdrawETH(ethers.parseEther('0.5'), user.address)).to.emit(debank, 'Withdraw')
    expect(await debank.balanceOf(user.address, ethers.ZeroAddress)).to.equal(ethers.parseEther('0.5'))
  })

  it('deposits and withdraws ERC20', async () => {
    const [user] = await ethers.getSigners()
    const DeBank = await ethers.getContractFactory('DeBank')
    const debank = await DeBank.deploy()
    await debank.waitForDeployment()

    const Mock = await ethers.getContractFactory('MockERC20')
    const token = await Mock.deploy('Mock', 'MOCK', ethers.parseEther('1000'))
    await token.waitForDeployment()

    await token.approve(await debank.getAddress(), ethers.parseEther('10'))
    await expect(debank.depositToken(await token.getAddress(), ethers.parseEther('10'))).to.emit(debank, 'Deposit')
    expect(await debank.balanceOf(user.address, await token.getAddress())).to.equal(ethers.parseEther('10'))

    await expect(debank.withdrawToken(await token.getAddress(), ethers.parseEther('4'), user.address)).to.emit(debank, 'Withdraw')
    expect(await debank.balanceOf(user.address, await token.getAddress())).to.equal(ethers.parseEther('6'))
  })
})
