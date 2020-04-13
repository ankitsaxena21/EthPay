pragma solidity ^0.5.0;
import './IERC20.sol';
import './CTokenInterface.sol';
contract Compound {
    IERC20 dai;
    CTokenInterface cDai;
    mapping(address => uint256) public balances;
    event deposited(address user, uint256 amount);
    event withdrawal(address user, uint256 amount);
    constructor(
        address _dai,
        address _cDai) public {
            dai = IERC20(_dai);
            cDai = CTokenInterface(_cDai);
        }
    function deposit(uint _amt) external {
        dai.approve(address(cDai), _amt);
        cDai.mint(_amt);
        balances[msg.sender] += _amt;
        emit deposited(msg.sender, _amt);
    }

    function withdraw(uint _amt) external {
        require(msg.sender != address(0x0),"address is zero address");
        require(balances[msg.sender] >= _amt, "insuficient funds");
        require(balances[msg.sender] + _amt >= balances[msg.sender], "insuficient funds");
        cDai.redeem(_amt);
        balances[msg.sender] -= _amt;
        emit withdrawal(msg.sender, _amt);
    }
}