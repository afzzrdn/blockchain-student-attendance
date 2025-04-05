// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const AbsensiMahasiswa = await hre.ethers.getContractFactory("AbsensiMahasiswa");
  const contract = await AbsensiMahasiswa.deploy();
  await contract.deployed();

  console.log(`✅ Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
