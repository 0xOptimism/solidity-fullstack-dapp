//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    address public owner;
    mapping(address => uint256) balance;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        balance[owner] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
