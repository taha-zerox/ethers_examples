const { ethers } = require("ethers");
require("dotenv").config();

const provider_url = process.env.ETH_SEPOLIA_NODE;
const provider = new ethers.providers.JsonRpcProvider(
    provider_url
    // "http://localhost:8545"
);

module.exports = {
    provider,
};
