//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract MockContract {
    uint256 value;
    function setValue(uint256 _value) public {
        value = _value;
    }
    function getValue() view public returns (uint256){
        return value;
    }
}