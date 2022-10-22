// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConvertor.sol";

error FundMe__MinimumFundAmount();
error FundMe__OwnerError();

/** @title Fund donation contract
 *  @author Pattrick collins
 *  @notice Fund donation contract dev
 *  @dev Fund donation contract dev
 */
contract FundMe {
    // Type declarations
    using PriceConvertor for uint256;

    // State declarations
    uint256 public constant MINIMUM_USD = 10;
    address private immutable i_owner;
    address[] private s_funders;
    mapping(address => uint256) private s_fundersHistory;
    AggregatorV3Interface private s_priceFeed;

    // modifiers
    modifier isOwner() {
        if (msg.sender != i_owner) revert FundMe__OwnerError();
        _;
    }

    // functions
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     *  @notice Fund donation contract dev
     *  @dev implelemtnts fund function for this conteract
     */
    function fund() public payable {
        if (msg.value.getConversionRate(s_priceFeed) < (MINIMUM_USD * 1e18))
            revert FundMe__MinimumFundAmount();

        s_funders.push(msg.sender);
        s_fundersHistory[msg.sender] = msg.value;
    }

    function withdraw() public isOwner {
        for (uint i = 0; i < s_funders.length; i++) {
            address funder = s_funders[i];
            s_fundersHistory[funder] = 0;
        }
        s_funders = new address[](0);
        // send funds
        (bool callRes, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callRes, "call operation didn't work");
    }

    function cheapWithdraw() public isOwner {
        address[] memory funders = s_funders;
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            s_fundersHistory[funder] = 0;
        }
        s_funders = new address[](0);
        // send funds
        (bool callRes, ) = i_owner.call{value: address(this).balance}("");
        require(callRes, "call operation didn't work");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunder(address funder)
        public
        view
        returns (uint256)
    {
        return s_fundersHistory[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
