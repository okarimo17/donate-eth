// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/** @title PriceConvertor contract
 *  @author Pattrick collins
 *  @notice PriceConvertor
 *  @dev PriceConvertor
 */
library PriceConvertor {
    function lastETHUSDPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        (
            ,
            /*uint80 roundID*/
            int256 lastprice, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return uint256(lastprice * 1e10);
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = lastETHUSDPrice(priceFeed);
        uint256 amountOnUSD = (ethAmount * ethPrice) / 1e18;
        return amountOnUSD;
    }
}
