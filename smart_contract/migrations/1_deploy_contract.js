const farm = artifacts.require("ProductTraceability");

module.exports = function (deployer) {
    const instance = deployer.deploy(farm);
    console.log("Contract deployed at address: " + instance.address);
    }