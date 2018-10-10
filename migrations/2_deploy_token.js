var ERC721 = artifacts.require("./Test.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ERC721, { from: accounts[0] })
};
