import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { ethers, network } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying with:', deployer.address)

  const factory = await ethers.getContractFactory('DeBank')
  const contract = await factory.deploy()
  await contract.waitForDeployment()

  const address = await contract.getAddress()
  const chainId = (await ethers.provider.getNetwork()).chainId
  console.log(`Deployed DeBank to ${address} on chainId ${chainId}`)

  const artifact = await artifacts.readArtifact('DeBank')
  const outDir = path.resolve(__dirname, '../../apps/web/contracts')
  try { mkdirSync(outDir, { recursive: true }) } catch {}
  const outPath = path.join(outDir, 'deBank.json')
  writeFileSync(outPath, JSON.stringify({ address, chainId, abi: artifact.abi }, null, 2))
  console.log('Wrote frontend contract config to', outPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})