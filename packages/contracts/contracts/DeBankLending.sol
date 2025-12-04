// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DeBankLending is ReentrancyGuard {
    address public constant NATIVE_TOKEN = address(0);
    uint256 public constant INTEREST_RATE = 5; // 5% annual
    
    struct Loan {
        address borrower;
        address token;
        uint256 principal;
        uint256 collateral;
        uint256 timestamp;
        bool repaid;
    }

    mapping(address => mapping(address => uint256)) public deposits; // user => token => amount
    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;

    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdraw(address indexed user, address indexed token, uint256 amount);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 principal, uint256 collateral);
    event LoanRepaid(uint256 indexed loanId, uint256 principal, uint256 interest);

    function depositCollateral(address token, uint256 amount) public {
        require(amount > 0, "ZeroAmount");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    function depositETHCollateral() public payable {
        require(msg.value > 0, "ZeroAmount");
        deposits[msg.sender][NATIVE_TOKEN] += msg.value;
        emit Deposit(msg.sender, NATIVE_TOKEN, msg.value);
    }

    function createLoan(address token, uint256 principal) public nonReentrant {
        uint256 collateralRequired = (principal * 15) / 10; // 150% collateral requirement
        uint256 collateral = deposits[msg.sender][NATIVE_TOKEN];
        require(collateral >= collateralRequired, "InsufficientCollateral");
        
        deposits[msg.sender][NATIVE_TOKEN] -= collateralRequired;
        
        uint256 loanId = loanCounter++;
        loans[loanId] = Loan({
            borrower: msg.sender,
            token: token,
            principal: principal,
            collateral: collateralRequired,
            timestamp: block.timestamp,
            repaid: false
        });

        IERC20(token).transfer(msg.sender, principal);
        emit LoanCreated(loanId, msg.sender, principal, collateralRequired);
    }

    function repayLoan(uint256 loanId) public nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.borrower == msg.sender, "NotBorrower");
        require(!loan.repaid, "AlreadyRepaid");

        uint256 timeElapsed = block.timestamp - loan.timestamp;
        uint256 interest = (loan.principal * INTEREST_RATE * timeElapsed) / (365 days * 100);
        uint256 totalRepay = loan.principal + interest;

        IERC20(loan.token).transferFrom(msg.sender, address(this), totalRepay);
        
        loan.repaid = true;
        deposits[msg.sender][NATIVE_TOKEN] += loan.collateral;

        emit LoanRepaid(loanId, loan.principal, interest);
    }

    function withdrawCollateral(address token, uint256 amount) public nonReentrant {
        require(deposits[msg.sender][token] >= amount, "InsufficientBalance");
        deposits[msg.sender][token] -= amount;

        if (token == NATIVE_TOKEN) {
            (bool ok, ) = payable(msg.sender).call{value: amount}("");
            require(ok, "SendFailed");
        } else {
            IERC20(token).transfer(msg.sender, amount);
        }

        emit Withdraw(msg.sender, token, amount);
    }

    function getCollateralBalance(address user, address token) external view returns (uint256) {
        return deposits[user][token];
    }
}
