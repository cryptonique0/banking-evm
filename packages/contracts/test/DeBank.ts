import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBank', function () {
  it('deposits and withdraws ETH', async () => {
    const [user] = await ethers.getSigners()
    const factory = await ethers.getContractFactory('DeBank')
    const debank = await factory.deploy()
    await debank.waitForDeployment()

    await expect(user.sendTransaction({ to: await debank.getAddress(), value: ethers.parseEther('1') }))
      .to.changeEtherBalance(debank, ethers.parseEther('1'))

    const before = await ethers.provider.getBalance(user.address)
    const tx = await debank.connect(user).withdrawETH(ethers.parseEther('0.4'), user.address)
    const receipt = await tx.wait()
    const gas = receipt?.gasUsed * receipt?.gasPrice!
    const after = await ethers.provider.getBalance(user.address)
    expect(after + gas).to.be.closeTo(before - ethers.parseEther('0.6'), ethers.parseEther('0.001'))
  })
})import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBank', function () {
  it('deposits and withdraws ETH', async () => {
    const [user] = await ethers.getSigners()
    const factory = await ethers.getContractFactory('DeBank')
    const debank = await factory.deploy()
    await debank.waitForDeployment()

    await expect(user.sendTransaction({ to: await debank.getAddress(), value: ethers.parseEther('1') }))
      .to.changeEtherBalance(debank, ethers.parseEther('1'))

    const before = await ethers.provider.getBalance(user.address)
    const tx = await debank.connect(user).withdrawETH(ethers.parseEther('0.4'), user.address)
    const receipt = await tx.wait()
    const gas = receipt?.gasUsed * receipt?.gasPrice!
    const after = await ethers.provider.getBalance(user.address)
    expect(after + gas).to.be.closeTo(before - ethers.parseEther('0.6'), ethers.parseEther('0.001'))
  })
})