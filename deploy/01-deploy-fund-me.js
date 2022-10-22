const {
	networkConfig,
	developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verifyContract } = require("../utils/verifyContrct");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	let ethUsdFeedPriceAddress;

	if (developmentChains.includes(network.name)) {
		const MockV3Aggregator = await deployments.get("MockV3Aggregator");
		ethUsdFeedPriceAddress = MockV3Aggregator.address;
		log("MockV3Aggregator" + ethUsdFeedPriceAddress);
	} else {
		ethUsdFeedPriceAddress = networkConfig[chainId].ethUsdPriceAddress;
	}

	const fundMeArgs = [ethUsdFeedPriceAddress];
	const fundMe = await deploy("FundMe", {
		from: deployer,
		args: fundMeArgs,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

	log(`FundMe deployed at ${fundMe.address}`);
	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
		await verifyContract(fundMe.address, fundMeArgs);
		log(`FundMe verified at ${fundMe.address}`);
	}
};

module.exports.tags = ["all", "fundme"];
