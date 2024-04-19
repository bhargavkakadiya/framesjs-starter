// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./lib/Structs.sol";

contract FundRaiser {
    mapping(uint256 => Structs.FundRaiser) public fundRaiser;
    mapping(address => mapping(uint256 => uint256)) public donator;

    address public owner;
    uint256 public frCount = 0;

    // ann event for the fundraiser registration and its id
    event FundRaiserRegistered(uint256 _fdId);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function donate(uint256 _fdId) public payable {
        require(msg.value > 0, "You need to send some ether");
        require(fundRaiser[_fdId].isAcceptingDonations == true, "Fundraiser target already reached");

        donator[msg.sender][_fdId] += msg.value;
        fundRaiser[_fdId].donations += msg.value;
        fundRaiser[_fdId].donationsLeft += msg.value;

        if (fundRaiser[_fdId].donations >= fundRaiser[_fdId].target) {
            fundRaiser[_fdId].isAcceptingDonations = false;
        }
    }

    function withdraw(uint256 _fdId) public {
        require(fundRaiser[_fdId].beneficiary == msg.sender, "Only the owner can withdraw");
        require(fundRaiser[_fdId].donationsLeft > 0, "There's noting to withdraw");

        payable(fundRaiser[_fdId].beneficiary).transfer(fundRaiser[_fdId].donationsLeft);
        fundRaiser[_fdId].donationsLeft = 0;
    }

    function registerFundRaiser(
        string memory _name,
        string memory _desc,
        uint256 _target,
        uint256 _castId,
        uint256 _fId,
        uint256 _fdId
    ) public {
        require(fundRaiser[_fdId].beneficiary == address(0), "Invalid Fundraiser Id");

        fundRaiser[frCount].name = _name;
        fundRaiser[frCount].description = _desc;
        fundRaiser[frCount].target = _target;
        fundRaiser[frCount].donations = 0;
        fundRaiser[frCount].donationsLeft = 0;
        fundRaiser[frCount].fid = _fId;
        fundRaiser[frCount].castId = _castId;
        fundRaiser[frCount].fdId = frCount;
        fundRaiser[frCount].isAcceptingDonations = true;
        fundRaiser[frCount].beneficiary = msg.sender;
        emit FundRaiserRegistered(frCount);
        frCount++;
    }

    function killFundRaiser(uint256 _fdId) public {
        require(fundRaiser[_fdId].beneficiary == msg.sender, "Only Owner can kill the fundraiser");
        require(fundRaiser[_fdId].isAcceptingDonations == true, "fundRaiser is not active anymore");

        fundRaiser[_fdId].isAcceptingDonations = false;
        payable(fundRaiser[_fdId].beneficiary).transfer(fundRaiser[_fdId].donationsLeft);
        fundRaiser[_fdId].donationsLeft = 0;
    }

    function getAllFundRaisers() public view returns (Structs.FundRaiser[] memory) {
        Structs.FundRaiser[] memory fundRaisers = new Structs.FundRaiser[](frCount);
        for (uint256 i = 0; i < frCount; i++) {
            fundRaisers[i] = fundRaiser[i];
        }
        return fundRaisers;
    }
}
