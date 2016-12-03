pragma solidity ^0.4.0;

contract owned {
    address owner;

    modifier onlyowner() {
        if (msg.sender == owner) {
            _;
        } else throw;
    }

    function owned() {
        owner = msg.sender;
    }
}