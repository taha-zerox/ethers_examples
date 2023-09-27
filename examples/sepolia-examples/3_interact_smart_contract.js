const { ethers } = require("ethers");
const { sepoliaProvider } = require("../../configs/APIConfig");
const { sendContractTransaction } = require("../../utils/ethUtils");

const contractAbi = require("../../build-info/SingleNumber.json");

const contractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a"; // Our simple contract

const privateKey = process.env.WALLET_PRIVATE;

const main = async () => {
    const { txResponse } = await sendContractTransaction(
        sepoliaProvider,
        privateKey,
        contractAbi,
        contractAddress
    );

    console.log(`Transaction hash: ${txResponse.hash}`);
};

main();
