const HDWalletProvider = require('@truffle/hdwallet-provider');
const keys = require('./keys.json');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_build_directory: './public/contracts',
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(keys.PRIVATE_KEY, keys.INFURA_RINKEBY_URL),
      network_id: 4, // rinkeby's id
      gas: 5500000, // rinkeby has a lower block limit than mainnet
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.14',
    },
  },

  api_keys: {
    etherscan: 'DXK9A1NQ576IKV6WNM3GVKAR9R44PMKBP3',
  },
  plugins: ['truffle-plugin-verify'],
};
