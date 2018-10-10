// const Token = artifacts.require("Test.sol");
// const { readFileSync } = require('fs')

// contract("Test Token", accounts => {
//   // it("Check deployment", async () => {
//   //   // console.log(accounts);
//   //   const tokenInstance = await Token.deployed();
//   //   console.log(tokenInstance.address);
//   // });

//   // it("Mint token", async () => {
//   //   const manager = accounts[0];
//   //   const tokenInstance = await Token.deployed();

//   //   await tokenInstance.mint(accounts[0], { from: accounts[0] });
//   //   let result = await tokenInstance.arrayOfTokensByAddress(accounts[0]);
//   //   console.log(result[0].toNumber());
//   //   await tokenInstance.mint(accounts[0], { from: accounts[0] });

//   //   result = await tokenInstance.arrayOfTokensByAddress(accounts[0]);
//   //   console.log(result[1].toNumber());
//   // });

//   it("create account", async () => {
//     // console.log(accounts);
//     const LoomTruffleProvider = require('loom-truffle-provider')

//     const chainId    = 'default'
//     const writeUrl   = 'http://127.0.0.1:46658/rpc'
//     const readUrl    = 'http://127.0.0.1:46658/query'
//     const privateKey = readFileSync('./private_key', 'utf-8')
    
//     const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
//     loomTruffleProvider.createExtraAccounts(10)
//     const loomProvider = loomTruffleProvider.getProviderEngine()

//     // console.log("Accounts list", loomProvider.accountsAddrList)
//     // console.log("Accounts and Private Keys", loomProvider.accounts)   
//     for (var key of loomProvider.accounts.keys()) {
//       // var value = loomProvider.accounts.get(key)
//       console.log(key);
//     }
//     for (var value of loomProvider.accounts.values()) {
//       // var value = loomProvider.accounts.get(key)
//       console.log(value.toString('hex'));
//       console.log("   ");
//     }
//   });
// });
