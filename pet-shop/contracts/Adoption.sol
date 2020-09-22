// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Adoption {
    // 创建一个数组用来存储领养者与宠物的关联信息
    address[16] public adopters;

    // 宠物领养
    function adopt(uint256 petId) public returns (uint256) {
        require(petId >= 0 && petId <= 15);
        // 存储当前领养人的地址信息
        adopters[petId] = msg.sender;
        // 返回领养人petId
        return petId;
    }

    // 返回已领养者的信息（只读）view: 只读 pure: 不读写
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
