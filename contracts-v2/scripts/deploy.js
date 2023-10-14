const { ethers } = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log('Getting contract factory...');
  const Pengumon = await ethers.getContractFactory("Pengumon");
  console.log('Deploying contract...');
  const pengumon = await Pengumon.deploy();
  await pengumon.deployed();
  console.log('Contract deployed to:', pengumon.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
