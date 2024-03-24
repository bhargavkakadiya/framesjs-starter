// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Structs {
    struct FundRaiser {
        string name;
        string description;
        uint256 target;
        uint256 donations;
        uint256 donationsLeft;
        uint256 fid;
        uint256 fdId;
        uint256 castId;
        bool isAcceptingDonations;
        address beneficiary;
    }
}
