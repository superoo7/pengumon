require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: process.env.GOERLI_URL,
      network_id: 5,
      accounts: [
        `0x${process.env.GOERLI_PRIVATE_KEY}`
      ],
      allowUnlimitedContractSize: true,
    },
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      network_id: 5001,
      accounts: [
        `0x${process.env.GOERLI_PRIVATE_KEY}`
      ],
      allowUnlimitedContractSize: true,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
