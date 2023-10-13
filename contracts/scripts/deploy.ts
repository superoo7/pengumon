import { getContractAddress } from "@openzeppelin/hardhat-upgrades/dist/utils";
import { ethers, upgrades } from "hardhat";
import { getImplementationAddress } from '@openzeppelin/upgrades-core';



async function main() {
  
  const [deployer] = await ethers.getSigners();
  const Pengumon = await ethers.getContractFactory("Pengumon");
  


  

  const pengumon = await Pengumon.deploy();
  await pengumon.waitForDeployment();
  console.log(pengumon.getAddress())



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});