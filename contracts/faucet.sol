// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenFaucet is Ownable, ReentrancyGuard {
    // Mapping of token addresses to their respective ERC20 contracts
    mapping(address => IERC20) public tokens;
    
    // Mapping to track last request time for each address
    mapping(address => mapping(address => uint256)) public lastRequestTime;
    
    // Predefined token amounts
    mapping(uint256 => uint256) public tokenAmounts;
    
    // Rate limit (24 hours)
    uint256 public constant RATE_LIMIT = 1 days;

    // Events
    event TokensRequested(
        address indexed requester, 
        address indexed tokenAddress, 
        uint256 amount
    );
    
    constructor() Ownable(msg.sender) {
        // Predefined token amount options
        tokenAmounts[1000] = 1_000 * 10**18;       // 1,000 tokens
        tokenAmounts[10000] = 10_000 * 10**18;     // 10,000 tokens
        tokenAmounts[100000] = 100_000 * 10**18;   // 100,000 tokens
    }

    // Add supported tokens (only owner)
    function addSupportedToken(address tokenAddress) external onlyOwner {
        tokens[tokenAddress] = IERC20(tokenAddress);
    }

    // Remove supported tokens (only owner)
    function removeSupportedToken(address tokenAddress) external onlyOwner {
        delete tokens[tokenAddress];
    }

    // Withdraw tokens from contract (only owner)
    function withdrawTokens(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20 token = tokens[tokenAddress];
        require(token.transfer(owner(), amount), "Transfer failed");
    }

    // Token request function
    function requestTokens(
        address tokenAddress, 
        uint256 amount
    ) external nonReentrant{

        // Check if token is supported
        IERC20 token = tokens[tokenAddress];
        require(address(token) != address(0), "Unsupported token");

        // Check rate limit
        require(
            block.timestamp >= lastRequestTime[msg.sender][tokenAddress] + RATE_LIMIT, 
            "Rate limit: Only one request per 24 hours"
        );

        // Validate amount
        uint256 requestedAmount = tokenAmounts[amount];
        require(requestedAmount > 0, "Invalid token amount");

        // Check contract balance
        require(
            token.balanceOf(address(this)) >= requestedAmount, 
            "Insufficient faucet balance"
        );

        // Update last request time
        lastRequestTime[msg.sender][tokenAddress] = block.timestamp;

        // Transfer tokens
        require(
            token.transfer(msg.sender, requestedAmount), 
            "Token transfer failed"
        );

        // Emit event
        emit TokensRequested(msg.sender, tokenAddress, requestedAmount);
    }

    // Allow contract to receive funds
    receive() external payable {}
}