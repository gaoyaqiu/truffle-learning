// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TutorialToken is ERC20 {
    string public name = "TutorialToken";
    string public symbol = "TT";
    uint8 public decimals = 2;
    // 发行代币的总量
    uint256 public INITIAL_SUPPLY = 12000;

    constructor() public {
        // msg.sender 当前代币的持有者
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
