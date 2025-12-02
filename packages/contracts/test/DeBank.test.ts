import { expect } from 'chai'
import { ethers } from 'hardhat'
import { DeBank, MockERC20 } from '../typechain-types'
import { SignerWithAddress } from '@nomicfoundation/hardhat-toolbox/signers'

describe('DeBank', function () {
  let deBank: DeBank
  let token: MockERC20
  let owner: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  const NATIVE = '0x0000000000000000000000000000000000000000'

  beforeEach(async () => {
    ;[owner, user1, user2] = await ethers.getSigners()
    const DeBankFactory = await ethers.getContractFactory('DeBank')
    deBank = await DeBankFactory.deploy()
    await deBank.waitForDeployment()

    const TokenFactory = await ethers.getContractFactory('MockERC20')
    token = await TokenFactory.deploy()
    await token.waitForDeployment()
    await token.mint(user1.address, ethers.parseEther('1000'))
  })

  describe('ETH Operations', () => {
    it('should deposit ETH', async () => {
      await deBank.connect(user1).depositETH({ value: ethers.parseEther('1') })
      expect(await deBank.balanceOf(user1.address, NATIVE)).to.equal(ethers.parseEther('1'))
    })

    it('should withdraw ETH', async () => {
      await deBank.connect(user1).depositETH({ value: ethers.parseEther('1') })
      const balBefore = await ethers.provider.getBalance(user1.address)
      const tx = await deBank.connect(user1).withdrawETH(ethers.parseEther('0.5'), user1.address)
      const receipt = await tx.wait()
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice
      const balAfter = await ethers.provider.getBalance(user1.address)
      expect(balAfter).to.equal(balBefore + ethers.parseEther('0.5') - gasUsed)
      expect(await deBank.balanceOf(user1.address, NATIVE)).to.equal(ethers.parseEther('0.5'))
    })
  })

  describe('ERC20 Operations', () => {
    it('should deposit ERC20', async () => {
      await token.connect(user1).approve(await deBank.getAddress(), ethers.parseEther('100'))
      await deBank.connect(user1).depositToken(await token.getAddress(), ethers.parseEther('100'))
      expect(await deBank.balanceOf(user1.address, await token.getAddress())).to.equal(ethers.parseEther('100'))
    })

    it('should withdraw ERC20', async () => {
      await token.connect(user1).approve(await deBank.getAddress(), ethers.parseEther('100'))
      await deBank.connect(user1).depositToken(await token.getAddress(), ethers.parseEther('100'))
      await deBank.connect(user1).withdrawToken(await token.getAddress(), ethers.parseEther('50'), user1.address)
      expect(await deBank.balanceOf(user1.address, await token.getAddress())).to.equal(ethers.parseEther('50'))
      expect(await token.balanceOf(user1.address)).to.equal(ethers.parseEther('950'))
    })
  })

  describe('Internal Transfer', () => {
    it('should transfer ETH internally', async () => {
      await deBank.connect(user1).depositETH({ value: ethers.parseEther('1') })
      await deBank.connect(user1).transferInternal(NATIVE, user2.address, ethers.parseEther('0.3'))
      expect(await deBank.balanceOf(user1.address, NATIVE)).to.equal(ethers.parseEther('0.7'))
      expect(await deBank.balanceOf(user2.address, NATIVE)).to.equal(ethers.parseEther('0.3'))
    })

    it('should transfer ERC20 internally', async () => {
      await token.connect(user1).approve(await deBank.getAddress(), ethers.parseEther('100'))
      await deBank.connect(user1).depositToken(await token.getAddress(), ethers.parseEther('100'))
      await deBank.connect(user1).transferInternal(await token.getAddress(), user2.address, ethers.parseEther('40'))
      expect(await deBank.balanceOf(user1.address, await token.getAddress())).to.equal(ethers.parseEther('60'))
      expect(await deBank.balanceOf(user2.address, await token.getAddress())).to.equal(ethers.parseEther('40'))
    })
  })
})
