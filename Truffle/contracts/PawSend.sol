// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.6.12;

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
}

/**
 * @dev Interface of the Pawthereum contract.
 */
interface Pawthereum {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function charityWallet() external view returns (address);
    function marketingWallet() external view returns (address);
    function stakingWallet() external view returns (address);

    function _feeDecimal() external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract PawSend is Ownable {
    using SafeMath for uint256;

    Pawthereum public pawth = Pawthereum(0x3bae287fF1754bB2D390bFF103C998F9479B049d);

    uint256 public charitySendTax = 200;
    uint256 public marketingSendTax = 200;
    uint256 public burnSendTax = 0;
    uint256 public stakingSendTax = 0;

    bool public killSwitchEngaged = false;

    event Send(
        address sender,
        address receiver,
        uint256 amount,
        string message
    );

    constructor () public {}

    function send (address _receiver, uint256 _amount, string memory _message) external {
      require(killSwitchEngaged == false, "Kill switch is engaged");
      pawth.transferFrom(_msgSender(), address(this), _amount);
      uint256 _transferAmount = _amount;
      uint256 _feeDecimal = pawth._feeDecimal();
      
      if (charitySendTax != 0) {
        uint256 _charityTax = _amount.mul(charitySendTax).div(10**(_feeDecimal + 2));
        pawth.transfer(pawth.charityWallet(), _charityTax);
        _transferAmount = _transferAmount.sub(_charityTax);
      }

      if (marketingSendTax != 0) {
        uint256 _marketingTax = _amount.mul(marketingSendTax).div(10**(_feeDecimal + 2));
        pawth.transfer(pawth.marketingWallet(), _marketingTax);
        _transferAmount = _transferAmount.sub(_marketingTax);
      }

      if (burnSendTax != 0) {
        uint256 _burnTax = _amount.mul(burnSendTax).div(10**(_feeDecimal + 2));
        pawth.transfer(0x000000000000000000000000000000000000dEaD, _burnTax);
        _transferAmount = _transferAmount.sub(_burnTax);
      }

      if (stakingSendTax != 0) {
        uint256 _stakingTax = _amount.mul(stakingSendTax).div(10**(_feeDecimal + 2));
        pawth.transfer(pawth.stakingWallet(), _stakingTax);
        _transferAmount = _transferAmount.sub(_stakingTax);
      }

      pawth.transfer(_receiver, _transferAmount);

      emit Send(_msgSender(), _receiver, _amount, _message);
    }

    function setPawth (address _newPawth) external onlyOwner {
      require (address(pawth) != _newPawth, "Pawth is already set to that address");
      pawth = Pawthereum(_newPawth);
    }

    function setCharitySendTax (uint256 _tax) external onlyOwner {
      charitySendTax = _tax;
    }

    function setMarketingSendTax (uint256 _tax) external onlyOwner {
      marketingSendTax = _tax;
    }

    function setBurnSendTax (uint256 _tax) external onlyOwner {
      burnSendTax = _tax;
    }

    function setStakingSendTax (uint256 _tax) external onlyOwner {
      stakingSendTax = _tax;
    }

    function toggleKillSwitch (bool _engaged) external onlyOwner {
      killSwitchEngaged = _engaged;
    }

    function withdrawEthToOwner (uint256 _amount) external onlyOwner {
        payable(_msgSender()).transfer(_amount);
    }

    function withdrawTokenToOwner(address tokenAddress, uint256 amount) external onlyOwner {
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
        require(balance >= amount, "Insufficient token balance");

        IERC20(tokenAddress).transfer(_msgSender(), amount);
    }
}