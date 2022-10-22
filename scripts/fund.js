// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, getNamedAccounts } = require("hardhat");
const hard = require("hardhat");

async function main() {
	const deployer = (await getNamedAccounts()).deployer;
	const FundMe = await ethers.getContract("FundMe", deployer);
	const trans = await FundMe.fund({ value: ethers.utils.parseEther("0.01") });
	const transReceipt = await trans.wait(1);
	console.log(transReceipt);
	console.log("Funded ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
