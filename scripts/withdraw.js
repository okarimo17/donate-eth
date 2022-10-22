const { ethers, getNamedAccounts } = require("hardhat");
const hard = require("hardhat");

async function main() {
	const deployer = (await getNamedAccounts()).deployer;
	const FundMe = await ethers.getContract("FundMe", deployer);

	const trans = await FundMe.withdraw();
	const transReceipt = await trans.wait(1);
	console.log(transReceipt);
	console.log("Withdrawed ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
