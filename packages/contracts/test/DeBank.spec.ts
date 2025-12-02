import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBank Contract', function () {
  it('Should deploy successfully', async function () {
    const DeBankFactory = await ethers.getContractFactory('DeBank')
    const deBank = await DeBankFactory.deploy()
    await deBank.waitForDeployment()
    const address = await deBank.getAddress()
    expect(address).to.be.properAddress
  })

  it('Should allow ETH deposits', async function () {
    const [user1] = await ethers.getSigners()
    const DeBankFactory = await ethers.getContractFactory('DeBank')
    const deBank = await DeBankFactory.deploy()
    await deBank.waitForDeployment()
    
    await deBank.connect(user1).depositETH({ value: ethers.parseEther('1') })
    const NATIVE = '0x0000000000000000000000000000000000000000'
    const balance = await deBank.balanceOf(user1.address, NATIVE)
    expect(balance).to.equal(ethers.parseEther('1'))
  })
})
