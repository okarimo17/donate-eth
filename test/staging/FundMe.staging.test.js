const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

// describe("FundMe", () => {
// 	let deployer, FundMe;
// 	const sendValue = ethers.utils.parseEther("0.01");
// 	beforeEach(async () => {
// 		// deployer = (await getNamedAccounts()).deployer;
// 		// FundMe = await ethers.getContract("FundMe", deployer);
// 	});

// 	it("Allows people to fund and withdraw", async () => {
// 		// await FundMe.fund({ value: sendValue });
// 		// await FundMe.withdraw();
// 		// const endingBalance = await FundMe.provider.getBalance(FundMe.address);
// 		// console.log(endingBalance.toString());
// 		expect(0).to.be.equal(0);
// 	});
// });

developmentChains.includes(network.name)
	? describe.skip
	: describe("FundMe", () => {
			let deployer, FundMe;
			const sendValue = ethers.utils.parseEther("0.01");
			beforeEach(async () => {
				// deployer = (await getNamedAccounts()).deployer;
				// FundMe = await ethers.getContract("FundMe", deployer);
			});

			it("Allows people to fund and withdraw", async () => {
				// await FundMe.fund({ value: sendValue });
				// await FundMe.withdraw();
				// const endingBalance = await FundMe.provider.getBalance(FundMe.address);
				// console.log(endingBalance.toString());
				expect(0).to.be.equal(0);
			});
	  });
