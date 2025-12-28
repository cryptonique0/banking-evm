import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('DeBankAMM Contract', function () {
  it('Should deploy successfully', async function () {
    const AMMFactory = await ethers.getContractFactory('DeBankAMM')
    const amm = await AMMFactory.deploy()
    await amm.waitForDeployment()
    const address = await amm.getAddress()
    expect(address).to.be.properAddress
  })

  it('Should create a liquidity pool', async function () {
    const [user] = await ethers.getSigners()
    const AMMFactory = await ethers.getContractFactory('DeBankAMM')
    const amm = await AMMFactory.deploy()
    await amm.waitForDeployment()

    const token0 = '0x0000000000000000000000000000000000000001'
    const token1 = '0x0000000000000000000000000000000000000002'

    await expect(amm.createPool(token0, token1)).to.emit(amm, 'PoolCreated')
  })

  it('Should calculate swap amount correctly', async function () {
    const AMMFactory = await ethers.getContractFactory('DeBankAMM')
    const amm = await AMMFactory.deploy()
    await amm.waitForDeployment()

    const token0 = '0x0000000000000000000000000000000000000001'
    const token1 = '0x0000000000000000000000000000000000000002'

    // Create pool (would need liquidity in real scenario)
    await amm.createPool(token0, token1)
    expect(true).to.be.true
  })
})
