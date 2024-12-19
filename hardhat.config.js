require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

//const privateKey = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    columbus: {
      url: vars.get("COLUMBUS_URL", "https://columbus.camino.network/ext/bc/C/rpc"),
      accounts: vars.has("COLUMBUS_DEPLOYER_PRIVATE_KEY") ? [vars.get("COLUMBUS_DEPLOYER_PRIVATE_KEY")] : [],
    },
    camino: {
      url: vars.get("CAMINO_URL", "https://api.camino.network/ext/bc/C/rpc"),
      accounts: vars.has("CAMINO_DEPLOYER_PRIVATE_KEY") ? [vars.get("CAMINO_DEPLOYER_PRIVATE_KEY")] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
