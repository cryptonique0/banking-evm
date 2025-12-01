// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DeBank is ReentrancyGuard {
    address public constant NATIVE_TOKEN = address(0);

    mapping(address => mapping(address => uint256)) public balances; // user => token => amount

    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdraw(address indexed user, address indexed token, uint256 amount, address indexed to);
    event TransferInternal(address indexed from, address indexed to, address indexed token, uint256 amount);

    function depositETH() public payable {
        require(msg.value > 0, "ZeroAmount");
        balances[msg.sender][NATIVE_TOKEN] += msg.value;
        emit Deposit(msg.sender, NATIVE_TOKEN, msg.value);
    }

    function withdrawETH(uint256 amount, address payable to) public nonReentrant {
        require(amount > 0, "ZeroAmount");
        uint256 bal = balances[msg.sender][NATIVE_TOKEN];
        require(bal >= amount, "Insufficient");
        balances[msg.sender][NATIVE_TOKEN] = bal - amount;
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "SendFailed");
        emit Withdraw(msg.sender, NATIVE_TOKEN, amount, to);
    }

    function depositToken(address token, uint256 amount) public {
        require(amount > 0, "ZeroAmount");
        require(token != NATIVE_TOKEN, "UseETH");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    function withdrawToken(address token, uint256 amount, address to) public nonReentrant {
        require(amount > 0, "ZeroAmount");
        require(token != NATIVE_TOKEN, "UseETH");
        uint256 bal = balances[msg.sender][token];
        require(bal >= amount, "Insufficient");
        balances[msg.sender][token] = bal - amount;
        IERC20(token).transfer(to, amount);
        emit Withdraw(msg.sender, token, amount, to);
    }

    function transferInternal(address token, address to, uint256 amount) public {
        require(amount > 0, "ZeroAmount");
        uint256 bal = balances[msg.sender][token];
        require(bal >= amount, "Insufficient");
        balances[msg.sender][token] = bal - amount;
        balances[to][token] += amount;
        emit TransferInternal(msg.sender, to, token, amount);
    }

    function balanceOf(address user, address token) external view returns (uint256) {
        return balances[user][token];
    }

    receive() external payable {
        depositETH();
    }
}
