# Feature Documentation

## Navigation

The dApp includes the following pages:

### Dashboard (/)
- Account overview with network and address
- Portfolio summary showing total balance, deposits, and rewards
- Transaction history with recent activity
- Multi-chain balance display

### Deposit (/deposit)
- Deposit native tokens (ETH/CELO) to the banking contract
- Support for ERC20 token deposits
- Real-time transaction status
- Gas estimation

### Withdraw (/withdraw)
- Withdraw deposited funds to any address
- Support for both native and ERC20 tokens
- Balance verification
- Transaction confirmation

### Transfer (/transfer)
- Internal transfer between users without blockchain fees
- Gas-efficient for frequent transfers
- Instant settlement within the contract
- Support for all deposited tokens

### Lending (/lending)
- Deposit collateral (ETH/CELO)
- Borrow tokens against collateral
- 150% collateralization ratio
- 5% annual interest rate
- Repay loans with interest
- Track active loans

### Staking (/staking)
- Stake native tokens for rewards
- 10% annual percentage yield
- Real-time reward calculation
- Flexible unstaking
- Compound earnings option

## Smart Contract Features

### Security
- ReentrancyGuard on all withdrawal functions
- No admin keys or centralized control
- Tested with Hardhat test suite
- Built on OpenZeppelin libraries

### Events
All contracts emit events for:
- Deposits
- Withdrawals
- Transfers
- Loan creation and repayment
- Staking and unstaking

### Gas Optimization
- Efficient storage patterns
- Minimal SLOAD operations
- Optimized loops
- Batch operations support

## Multi-Chain Support

The dApp seamlessly supports:
- **Base Sepolia** (testnet)
- **Base** (mainnet)
- **Celo Alfajores** (testnet)
- **Celo** (mainnet)

Users can switch chains directly from RainbowKit UI.

## Transaction History

Local storage tracks:
- All user transactions
- Transaction types (deposit, withdraw, transfer, etc.)
- Amounts and tokens
- Timestamps
- Status (pending, success, failed)

Limited to most recent 50 transactions per user.

## Future Enhancements

- [ ] Token swap functionality
- [ ] Flash loans
- [ ] Governance token
- [ ] DAO voting
- [ ] Cross-chain bridges
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Notification system
