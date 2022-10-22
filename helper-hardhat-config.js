const networkConfig = {
	5: {
		name: "goerli",
		ethUsdPriceAddress: "0xd4a33860578de61dbabdc8bfdb98fd742fa7028e",
	},
	137: {
		name: "polygon",
		ethUsdPriceAddress: "0x0715a7794a1dc8e42615f059dd6e406a6594651a",
	},
	// 31337
};

const developmentChains = ["hardhat", "localhost"];

const decimals = 8;
const initialAnswer = "200000000000";
module.exports = { networkConfig, developmentChains, initialAnswer, decimals };
