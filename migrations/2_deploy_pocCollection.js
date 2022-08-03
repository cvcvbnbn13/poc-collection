const PocCollection = artifacts.require('PocCollection');

module.exports = function (deployer) {
  deployer.deploy(PocCollection);
};
