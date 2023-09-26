const { ethers } = require("ethers");
const { sepoliaProvider } = require("../configs/infuraConfig");

const address = process.env.WALLET_ADDRESS;

const main = async () => {
    const balance = await sepoliaProvider.getBalance(address);
    console.log(
        `\nETH Balance of ${address} --> ${ethers.utils.formatEther(
            balance
        )} ETH\n`
    );
};

main();
