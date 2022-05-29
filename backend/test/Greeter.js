const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("It should accept fund to the contract", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    expect(await greeter.getBalance()).to.equal(0);

    const setDeposit = await greeter.deposit({ value: "20000000" });

    // wait until the transaction is mined
    await setDeposit.wait();
    expect(await greeter.getBalance()).to.equal("20000000");
  });
});
