const { run } = require("hardhat");

async function verifyContract(contractAddress, contractArgs) {
	console.log(`Verifing the contract...`);
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: contractArgs,
		});
	} catch (err) {
		if (err.message.toLowerCase().includes("already verified"))
			return console.log(`already verified")`);
		console.log(`Verification error : ${err.message}`);
	}
}

module.exports = { verifyContract };
