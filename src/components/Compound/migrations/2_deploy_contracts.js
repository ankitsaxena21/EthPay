const Compound = artifacts.require("Compound");

module.exports = function(deployer) {
  deployer.deploy(Compound,"0x06a480651D7829A711f8eE11c43ce726A764A02C","0x256530392a9817D07aaFEF489bDc750a26b7ef9f");
};
