const {
	developmentChains,
	decimals,
	initialAnswer,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments, network }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	if (developmentChains.includes(network.name)) {
		log("Deploying mock");
		await deploy("MockV3Aggregator", {
			contract: "MockV3Aggregator",
			from: deployer,
			log: true,
			args: [decimals, initialAnswer],
		});
	}
};

module.exports.tags = ["all", "mocks"];
