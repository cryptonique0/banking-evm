// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeBankStaking {
    address public constant NATIVE_TOKEN = address(0);
    uint256 public constant REWARD_RATE = 10; // 10% annual rewards
    
    struct Stake {
        address staker;
        address token;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => mapping(address => uint256)) public stakes; // user => token => amount
    mapping(address => mapping(address => uint256)) public stakeTime; // user => token => timestamp
    mapping(uint256 => Stake) public stakeHistory;
    uint256 public stakeCounter;

    event Staked(address indexed user, address indexed token, uint256 amount);
    event Unstaked(address indexed user, address indexed token, uint256 amount, uint256 reward);

    function stake(address token, uint256 amount) public {
        require(amount > 0, "ZeroAmount");
        
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender][token] += amount;
        stakeTime[msg.sender][token] = block.timestamp;

        stakeHistory[stakeCounter++] = Stake({
            staker: msg.sender,
            token: token,
            amount: amount,
            timestamp: block.timestamp
        });

        emit Staked(msg.sender, token, amount);
    }

    function stakeETH() public payable {
        require(msg.value > 0, "ZeroAmount");
        stakes[msg.sender][NATIVE_TOKEN] += msg.value;
        stakeTime[msg.sender][NATIVE_TOKEN] = block.timestamp;

        stakeHistory[stakeCounter++] = Stake({
            staker: msg.sender,
            token: NATIVE_TOKEN,
            amount: msg.value,
            timestamp: block.timestamp
        });

        emit Staked(msg.sender, NATIVE_TOKEN, msg.value);
    }

    function unstake(address token, uint256 amount) public {
        uint256 staked = stakes[msg.sender][token];
        require(staked >= amount, "InsufficientStake");

        uint256 timeElapsed = block.timestamp - stakeTime[msg.sender][token];
        uint256 reward = (amount * REWARD_RATE * timeElapsed) / (365 days * 100);

        stakes[msg.sender][token] -= amount;

        if (token == NATIVE_TOKEN) {
            (bool ok, ) = payable(msg.sender).call{value: amount + reward}("");
            require(ok, "SendFailed");
        } else {
            IERC20(token).transfer(msg.sender, amount + reward);
        }

        emit Unstaked(msg.sender, token, amount, reward);
    }

    function getRewards(address user, address token) external view returns (uint256) {
        uint256 staked = stakes[user][token];
        if (staked == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - stakeTime[user][token];
        return (staked * REWARD_RATE * timeElapsed) / (365 days * 100);
    }

    function getStakeAmount(address user, address token) external view returns (uint256) {
        return stakes[user][token];
    }
}
