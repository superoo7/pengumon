import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
// import "@nomiclabs/hardhat-etherscan";
// import "hardhat-contract-sizer";
import dotenv from "dotenv";
// import "hardhat-gas-reporter";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
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
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [
        `${process.env.ARBI_GOERLI_PRIVATE_KEY!}`,
        `${process.env.ARBI_GOERLI_PRIVATE_KEY_2}`,
      ],
      allowUnlimitedContractSize: true,
    }, eth : {
      url: `https://eth-mainnet.g.alchemy.com/v2/kFUd5HDlsu3YcXWpHCjKaxzmJcHft_Xs`,
      accounts: [
        `${process.env.ETH_PRIVATE_KEY!}`,
      ],
      allowUnlimitedContractSize: true,
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [
    //     `${process.env.GOERLI_PRIVATE_KEY!}`,
    //     `${process.env.GOERLI_PRIVATE_KEY_2}`,
    //   ],
    //   allowUnlimitedContractSize: true,
    // },
    // arb_goerli: {
    //   url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [
    //     `${process.env.ARBI_GOERLI_PRIVATE_KEY!}`,
    //     `${process.env.ARBI_GOERLI_PRIVATE_KEY_2}`,
    //   ],
    //   allowUnlimitedContractSize: true,
    // },
    // bsc_testnet: {
    //     url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
    //   accounts: [
    //     `${process.env.BSC_PRIV_KEY!}`,
    //     // `${process.env.ARBI_GOERLI_PRIVATE_KEY_2}`,
    //   ],
    //   allowUnlimitedContractSize: true,
    // }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;
