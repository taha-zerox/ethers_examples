const { ethers } = require("ethers");
require("dotenv").config();

const provider_url = process.env.ETH_SEPOLIA_NODE;
const provider = new ethers.providers.JsonRpcProvider(
    provider_url
    // "http://localhost:8545"
);

const address = process.env.WALLET_ADDRESS;

const main = async () => {
    const balance = await provider.getBalance(address);
    console.log(
        `\nETH Balance of ${address} --> ${ethers.utils.formatEther(
            balance
        )} ETH\n`
    );
};

main();
