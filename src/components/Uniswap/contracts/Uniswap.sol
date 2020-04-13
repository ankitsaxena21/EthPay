pragma solidity ^0.5.0;

import './IERC20.sol';

contract UniswapFactoryInterface {
  event NewExchange(address indexed token, address indexed exchange);

  function initializeFactory(address template) external;
  function createExchange(address token) external returns (address);
  function getExchange(address token) external view returns (address payable);
  function getToken(address token) external view returns (address);
  function getTokenWihId(uint256 token_id) external view returns (address);
}

contract UniswapExchangeInterface {
  event TokenPurchase(address indexed buyer, uint256 indexed eth_sold, uint256 indexed tokens_bought);
  event EthPurchase(address indexed buyer, uint256 indexed tokens_sold, uint256 indexed eth_bought);
  event AddLiquidity(address indexed provider, uint256 indexed eth_amount, uint256 indexed token_amount);
  event RemoveLiquidity(address indexed provider, uint256 indexed eth_amount, uint256 indexed token_amount);
  function () external payable;
  function getInputPrice(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) external view returns (uint256);
  function getOutputPrice(uint256 output_amount, uint256 input_reserve, uint256 output_reserve) external view returns (uint256);
  function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256);
  function ethToTokenTransferInput(uint256 min_tokens, uint256 deadline, address recipient) external payable returns(uint256);
  function ethToTokenSwapOutput(uint256 tokens_bought, uint256 deadline) external payable returns(uint256);
  function ethToTokenTransferOutput(uint256 tokens_bought, uint256 deadline, address recipient) external payable returns (uint256);
  function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256);
  function tokenToEthTransferInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline, address recipient) external returns (uint256);
  function tokenToEthSwapOutput(uint256 eth_bought, uint256 max_tokens, uint256 deadline) external returns (uint256);
  function tokenToEthTransferOutput(uint256 eth_bought, uint256 max_tokens, uint256 deadline, address recipient) external returns (uint256);
  function tokenToTokenSwapInput(
    uint256 tokens_sold, 
    uint256 min_tokens_bought, 
    uint256 min_eth_bought, 
    uint256 deadline, 
    address token_addr) 
    external returns (uint256);
  function tokenToTokenTransferInput(
    uint256 tokens_sold, 
    uint256 min_tokens_bought, 
    uint256 min_eth_bought, 
    uint256 deadline, 
    address recipient, 
    address token_addr) 
    external returns (uint256);
  function tokenToTokenSwapOutput(
    uint256 tokens_bought, 
    uint256 max_tokens_sold, 
    uint256 max_eth_sold, 
    uint256 deadline, 
    address token_addr) 
    external returns (uint256);
  function tokenToTokenTransferOutput(
    uint256 tokens_bought, 
    uint256 max_tokens_sold, 
    uint256 max_eth_sold, 
    uint256 deadline, 
    address recipient, 
    address token_addr) 
    external returns (uint256);
  function tokenToExchangeSwapInput(
    uint256 tokens_sold, 
    uint256 min_tokens_bought, 
    uint256 min_eth_bought, 
    uint256 deadline, 
    address exchange_addr) 
    external returns (uint256);
  function tokenToExchangeTransferInput(
    uint256 tokens_sold, 
    uint256 min_tokens_bought, 
    uint256 min_eth_bought, 
    uint256 deadline, 
    address recipient, 
    address exchange_addr) 
    external returns (uint256);
  function tokenToExchangeSwapOutput(
    uint256 tokens_bought, 
    uint256 max_tokens_sold, 
    uint256 max_eth_sold, 
    uint256 deadline, 
    address exchange_addr) 
    external returns (uint256);
  function tokenToExchangeTransferOutput(
    uint256 tokens_bought, 
    uint256 max_tokens_sold, 
    uint256 max_eth_sold, 
    uint256 deadline, 
    address recipient, 
    address exchange_addr) 
    external returns (uint256);
  function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256);
  function getEthToTokenOutputPrice(uint256 tokens_bought) external view returns (uint256);
  function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256);
  function getTokenToEthOutputPrice(uint256 eth_bought) external view returns (uint256);
  function tokenAddress() external view returns (address);
  function factoryAddress() external view returns (address);
  function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
  function removeLiquidity(uint256 amount, uint256 min_eth, uint256 min_tokens, uint256 deadline) external returns (uint256, uint256);
}

contract Uniswap {
    
    mapping(address => uint256) public balances;
    UniswapFactoryInterface public uniswapFactory;
    UniswapExchangeInterface public uniswapExchange;
    IERC20 public mBatToken;
    
    function setup(address uniswapFactoryAddress) external {
        uniswapFactory = UniswapFactoryInterface(uniswapFactoryAddress);
        uniswapFactory.initializeFactory(address(uniswapFactory));
    }
    
    function createExchange(address token) external {
        mBatToken = IERC20(token);
        uniswapFactory.createExchange(token);
        uniswapExchange = UniswapExchangeInterface(uniswapFactory.getExchange(token));
    }
    
    function balanceOf(address user) external view returns(uint) {
        return mBatToken.balanceOf(user);
    }
    
    function buy() external payable {
        uint tokenAmount = uniswapExchange.getEthToTokenInputPrice(msg.value);
        balances[msg.sender] += tokenAmount;
        uniswapExchange.ethToTokenTransferInput.value(msg.value)(
            tokenAmount,
            now + 120,
            msg.sender
            );
    }
    
    function sell(uint amount) external payable {
        balances[msg.sender] -= amount;
        uniswapExchange.tokenToEthTransferInput(
            amount,
            amount,
            now + 120,
            msg.sender
            );
    }
    
    function addLiquidity(address tokenAddress) external payable {
        uniswapExchange = UniswapExchangeInterface(uniswapFactory.getExchange(tokenAddress));
        uint tokenAmount = uniswapExchange.getEthToTokenInputPrice(msg.value);
        IERC20(tokenAddress).approve(address(uniswapExchange), tokenAmount);
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), tokenAmount);
        uniswapExchange.addLiquidity.value(msg.value)(
            tokenAmount,
            tokenAmount,
            now + 120
            );
    }
    
}
