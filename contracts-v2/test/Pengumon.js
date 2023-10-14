const { expect } = require("chai");

describe("Pengumon", () => {
  const deploy = async () => {
    const Pengumon = await ethers.getContractFactory("Pengumon");
    const contract = await Pengumon.deploy();
    // Create Character
    await contract.createCharacter("test", 5, 5, 5, 5);
    const pengumon = await contract.getPengumon(0);
    expect(pengumon.cuteness).to.equal(5);
    expect(pengumon.intelligence).to.equal(5);
    expect(pengumon.magic).to.equal(5);
    expect(pengumon.strength).to.equal(5);
    expect(pengumon.health).to.equal(100);
    expect(pengumon.soul).to.equal(0);
    return contract;
  };

  it("go wilderness", async () => {
    const contract = await deploy();

    await contract.penguWilderness(0);
    console.log(await contract.getPengumon(0));
    console.log(await contract.tokenIdToLastChangeStats(0))
    console.log("------")
    await contract.penguSleep(0);

    const pengumon = await contract.getPengumon(0);
    console.log(pengumon);
    const lastChange = await contract.tokenIdToLastChangeStats(0);
    console.log(lastChange);
  });
});
