const { expect, assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
	? describe("FundMe", () => {
			let FundMe, deployer;
			let mockV3Aggregator;
			const sendValue = ethers.utils.parseEther("1");
			beforeEach(async () => {
				deployer = (await getNamedAccounts()).deployer;
				await deployments.fixture(["all"]);
				FundMe = await ethers.getContract("FundMe", deployer);
				mockV3Aggregator = await ethers.getContract(
					"MockV3Aggregator",
					deployer
				);
			});
			describe("constructor", () => {
				it("sets aggregator correctly", async () => {
					const getPriceFeed = await FundMe.getPriceFeed();
					// assert.equal(getPriceFeed, mockV3Aggregator.address);
					expect(getPriceFeed).to.equal(mockV3Aggregator.address);
				});
			});
			describe("fund func", () => {
				it("Revert on funds 0", async () => {
					// FundMe__MinimumFundAmount
					await expect(FundMe.fund()).to.be.revertedWithCustomError(
						FundMe,
						"FundMe__MinimumFundAmount"
					);
				});
				it("Updates the amount after founding", async () => {
					await FundMe.fund({ value: sendValue });
					const funderByThis = await FundMe.getAddressToAmountFunder(deployer);
					await expect(funderByThis.toString()).to.be.equal(
						sendValue.toString()
					);
				});
				it("adds the funder", async () => {
					await FundMe.fund({ value: sendValue });
					const funder = await FundMe.getFunder(0);
					await expect(funder).to.be.equal(deployer);
				});
			});

			describe("withdraw function", () => {
				beforeEach(async () => {
					await FundMe.fund({ value: sendValue });
				});
				it("withdraw eth single funder", async () => {
					// arrange
					const startingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// act
					const withdrawTrans = await FundMe.withdraw();
					const withdrawTransReceipt = await withdrawTrans.wait(1);
					const { effectiveGasPrice, gasUsed } = withdrawTransReceipt;

					const gasCost = effectiveGasPrice.mul(gasUsed);

					const endingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// assert
					assert.equal(endingBalance, 0);
					assert.equal(
						startingBalance.add(startingDeployerBalance).toString(),
						endingDeployerBalance.add(gasCost).toString()
					);
				});
				it("multi withdraw eth from multi funders", async () => {
					const accounts = await ethers.getSigners();
					console.log(accounts.length);
					for (account of accounts) {
						const fundmeconnected = await FundMe.connect(account);
						await fundmeconnected.fund({ value: sendValue });
					}
					const startingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);
					await FundMe.connect(deployer);

					// ACT
					const withdrawTrans = await FundMe.withdraw();
					const withdrawTransReceipt = await withdrawTrans.wait(1);

					const { gasUsed, effectiveGasPrice } = withdrawTransReceipt;
					const gasCost = gasUsed.mul(effectiveGasPrice);
					const endingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// Balance withdrawed
					assert(endingBalance, 0);
					assert(
						startingBalance.add(startingDeployerBalance),
						endingDeployerBalance.add(gasCost)
					);

					// All list emptied
					await expect(FundMe.getFunder(0)).to.be.reverted;
					for (account of accounts) {
						assert.equal(
							await FundMe.getAddressToAmountFunder(account.address),
							0
						);
					}
				});
				it("only owner", async () => {
					const accounts = await ethers.getSigners();
					const connectedAttacker = await FundMe.connect(accounts[1]);
					await expect(
						connectedAttacker.withdraw()
					).to.be.revertedWithCustomError(FundMe, "FundMe__OwnerError");
				});

				it("withdraw eth single funder", async () => {
					// arrange
					const startingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// act
					const withdrawTrans = await FundMe.cheapWithdraw();
					const withdrawTransReceipt = await withdrawTrans.wait(1);
					const { effectiveGasPrice, gasUsed } = withdrawTransReceipt;

					const gasCost = effectiveGasPrice.mul(gasUsed);

					const endingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// assert
					assert.equal(endingBalance, 0);
					assert.equal(
						startingBalance.add(startingDeployerBalance).toString(),
						endingDeployerBalance.add(gasCost).toString()
					);
				});

				it("cheap only owner", async () => {
					const accounts = await ethers.getSigners();
					const connectedAttacker = await FundMe.connect(accounts[1]);
					await expect(
						connectedAttacker.cheapWithdraw()
					).to.be.revertedWithCustomError(FundMe, "FundMe__OwnerError");
				});

				it("multi cheaper withdraw eth from multi funders", async () => {
					const accounts = await ethers.getSigners();
					for (account of accounts) {
						const fundmeconnected = await FundMe.connect(account);
						await fundmeconnected.fund({ value: sendValue });
					}
					const startingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const startingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);
					await FundMe.connect(deployer);

					// ACT
					const withdrawTrans = await FundMe.cheapWithdraw();
					const withdrawTransReceipt = await withdrawTrans.wait(1);

					const { gasUsed, effectiveGasPrice } = withdrawTransReceipt;
					const gasCost = gasUsed.mul(effectiveGasPrice);
					const endingBalance = await FundMe.provider.getBalance(
						FundMe.address
					);
					const endingDeployerBalance = await FundMe.provider.getBalance(
						deployer
					);

					// Balance withdrawed
					assert(endingBalance, 0);
					assert(
						startingBalance.add(startingDeployerBalance),
						endingDeployerBalance.add(gasCost)
					);

					// All list emptied
					await expect(FundMe.getFunder(0)).to.be.reverted;
					for (account of accounts) {
						assert.equal(
							await FundMe.getAddressToAmountFunder(account.address),
							0
						);
					}
				});
			});
	  })
	: describe.skip;
