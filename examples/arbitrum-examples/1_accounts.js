const { ethers } = require("ethers");
const { arbitrumSepoliaProvider } = require("../../configs/APIConfig");

const address = process.env.ARB_SEP_WALLET_ADDRESS;

const main = async () => {
    const balance = await arbitrumSepoliaProvider.getBalance(address);
    console.log(
        `\nETH Balance of ${address} --> ${ethers.utils.formatEther(
            balance
        )} ETH\n`
    );
};

main();
