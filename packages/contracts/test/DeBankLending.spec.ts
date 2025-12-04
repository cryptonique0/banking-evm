import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBankLending Contract', function () {
  it('Should deploy successfully', async function () {
    const LendingFactory = await ethers.getContractFactory('DeBankLending')
    const lending = await LendingFactory.deploy()
    await lending.waitForDeployment()
    const address = await lending.getAddress()
    expect(address).to.be.properAddress
  })

  it('Should deposit collateral', async function () {
    const [user1] = await ethers.getSigners()
    const LendingFactory = await ethers.getContractFactory('DeBankLending')
    const lending = await LendingFactory.deploy()
    await lending.waitForDeployment()

    await lending.connect(user1).depositETHCollateral({ value: ethers.parseEther('10') })
    const NATIVE = '0x0000000000000000000000000000000000000000'
    const balance = await lending.getCollateralBalance(user1.address, NATIVE)
    expect(balance).to.equal(ethers.parseEther('10'))
  })
})

describe('DeBankStaking Contract', function () {
  it('Should deploy successfully', async function () {
    const StakingFactory = await ethers.getContractFactory('DeBankStaking')
    const staking = await StakingFactory.deploy()
    await staking.waitForDeployment()
    const address = await staking.getAddress()
    expect(address).to.be.properAddress
  })

  it('Should stake ETH', async function () {
    const [user1] = await ethers.getSigners()
    const StakingFactory = await ethers.getContractFactory('DeBankStaking')
    const staking = await StakingFactory.deploy()
    await staking.waitForDeployment()

    await staking.connect(user1).stakeETH({ value: ethers.parseEther('5') })
    const NATIVE = '0x0000000000000000000000000000000000000000'
    const staked = await staking.getStakeAmount(user1.address, NATIVE)
    expect(staked).to.equal(ethers.parseEther('5'))
  })
})
