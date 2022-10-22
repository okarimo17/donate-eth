require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLI_RPC = process.env.GOERLI_RPC;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const COINMARKET = process.env.COINMARKET;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: "hardhat",
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: GOERLI_RPC,
			accounts: [PRIVATE_KEY],
			chainId: 5,
			blockConfirmations: 6,
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			chainId: 31337,
		},
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API,
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKET,
		// token: "MATIC",
	},
};
