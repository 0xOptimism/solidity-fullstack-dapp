const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("It should accept fund to the contract", async function () {
    const Message = await ethers.getContractFactory("HelloWorld");
    const message = await Message.deploy();
    await message.deployed();
  });
});
