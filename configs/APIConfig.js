const { ethers } = require("ethers");
require("dotenv").config();

const sepoliaProviderUrl = process.env.ETH_SEPOLIA_NODE;
const goerliProviderUrl = process.env.ETH_GOERLI_NODE;
const arbitrumSepoliaProviderUrl = process.env.ARBITRUM_SEPOLIA_NODE;

const sepoliaProvider = new ethers.providers.JsonRpcProvider(
    sepoliaProviderUrl
    // "http://localhost:8545"
);

const goerliProvider = new ethers.providers.JsonRpcProvider(
    goerliProviderUrl
);

const arbitrumSepoliaProvider = new ethers.providers.JsonRpcProvider(
    arbitrumSepoliaProviderUrl
);


module.exports = {
    sepoliaProvider,
    goerliProvider,
    arbitrumSepoliaProvider,
};
