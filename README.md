# BlockChain donation app

This project demonstrates how we can create a full BlockChain app using the Hardhat framework.
That App can be used to create Donation (FundMe) blockchain app to any Ethereum EVM (MATIC,BSC,ETH,TESTNETS...), the contract allows you to receive ETH from anyone, and allows you to withdraw these funds to your account.
The project contains deployement scripts, unit and staging tests, Solidity contracts, and uses ChainLink interfaces
Try running some of the following tasks after installing all the libs and filling all the env variables: 

Deploy the app using command : 
```shell
npx hardhat deploy
```
Or using these for the Goerli testnet : 
```shell
npx hardhat deploy --network goerli
```

Send eth funds from your wallet to the contract : 
```shell
npx hardhat run scripts/fund.js
```
Withdraw allthe  eth funds to your wallet to the contract : 
```shell
npx hardhat run scripts/fund.js
```

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
