// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract DeBankAMM {
    // Simple constant product AMM (x*y=k model)
    
    struct Pool {
        address token0;
        address token1;
        uint256 reserve0;
        uint256 reserve1;
        uint256 totalSupply;
    }

    mapping(address => mapping(address => Pool)) public pools;
    mapping(address => uint256) public lpTokens; // LP token balances

    event PoolCreated(address indexed token0, address indexed token1);
    event LiquidityAdded(address indexed provider, address token0, uint256 amount0, address token1, uint256 amount1);
    event LiquidityRemoved(address indexed provider, address token0, uint256 amount0, address token1, uint256 amount1);
    event Swapped(address indexed user, address tokenIn, uint256 amountIn, address tokenOut, uint256 amountOut);

    // Create liquidity pool
    function createPool(address token0, address token1) public {
        require(token0 != token1, "SameToken");
        require(pools[token0][token1].token0 == address(0), "PoolExists");

        pools[token0][token1] = Pool({
            token0: token0,
            token1: token1,
            reserve0: 0,
            reserve1: 0,
            totalSupply: 0
        });

        emit PoolCreated(token0, token1);
    }

    // Add liquidity to pool
    function addLiquidity(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1
    ) public returns (uint256 liquidity) {
        Pool storage pool = pools[token0][token1];
        require(pool.token0 != address(0), "PoolNotFound");

        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);

        if (pool.totalSupply == 0) {
            liquidity = Math.sqrt(amount0 * amount1);
        } else {
            uint256 liquidity0 = (amount0 * pool.totalSupply) / pool.reserve0;
            uint256 liquidity1 = (amount1 * pool.totalSupply) / pool.reserve1;
            liquidity = liquidity0 < liquidity1 ? liquidity0 : liquidity1;
        }

        pool.reserve0 += amount0;
        pool.reserve1 += amount1;
        pool.totalSupply += liquidity;
        lpTokens[msg.sender] += liquidity;

        emit LiquidityAdded(msg.sender, token0, amount0, token1, amount1);
    }

    // Remove liquidity from pool
    function removeLiquidity(
        address token0,
        address token1,
        uint256 liquidity
    ) public returns (uint256 amount0, uint256 amount1) {
        Pool storage pool = pools[token0][token1];
        require(pool.token0 != address(0), "PoolNotFound");
        require(lpTokens[msg.sender] >= liquidity, "InsufficientLiquidity");

        amount0 = (liquidity * pool.reserve0) / pool.totalSupply;
        amount1 = (liquidity * pool.reserve1) / pool.totalSupply;

        pool.reserve0 -= amount0;
        pool.reserve1 -= amount1;
        pool.totalSupply -= liquidity;
        lpTokens[msg.sender] -= liquidity;

        IERC20(token0).transfer(msg.sender, amount0);
        IERC20(token1).transfer(msg.sender, amount1);

        emit LiquidityRemoved(msg.sender, token0, amount0, token1, amount1);
    }

    // Swap token0 for token1
    function swap(
        address token0,
        address token1,
        uint256 amountIn
    ) public returns (uint256 amountOut) {
        Pool storage pool = pools[token0][token1];
        require(pool.token0 != address(0), "PoolNotFound");
        require(amountIn > 0, "ZeroAmount");

        IERC20(token0).transferFrom(msg.sender, address(this), amountIn);

        // Calculate output using constant product formula: (x + amountIn) * (y - amountOut) = x * y
        uint256 numerator = amountIn * pool.reserve1 * 997; // 0.3% fee
        uint256 denominator = (pool.reserve0 * 1000) + (amountIn * 997);
        amountOut = numerator / denominator;

        require(amountOut > 0 && amountOut <= pool.reserve1, "InvalidOutput");

        pool.reserve0 += amountIn;
        pool.reserve1 -= amountOut;

        IERC20(token1).transfer(msg.sender, amountOut);
        emit Swapped(msg.sender, token0, amountIn, token1, amountOut);
    }

    // Get quote for swap
    function getAmountOut(
        address token0,
        address token1,
        uint256 amountIn
    ) external view returns (uint256 amountOut) {
        Pool memory pool = pools[token0][token1];
        require(pool.token0 != address(0), "PoolNotFound");

        uint256 numerator = amountIn * pool.reserve1 * 997;
        uint256 denominator = (pool.reserve0 * 1000) + (amountIn * 997);
        amountOut = numerator / denominator;
    }

    // Get pool reserves
    function getReserves(address token0, address token1) external view returns (uint256, uint256) {
        Pool memory pool = pools[token0][token1];
        return (pool.reserve0, pool.reserve1);
    }
}
