const { ethers } = require("ethers");
const { sepoliaProvider } = require("../../configs/APIConfig");
const { listenEvents } = require("../../utils/ethUtils");

const contractAbi = require("../../build-info/SingleNumber.json");

const contractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a"; // Our simple contract

const eventName = "NumberEmitted";

const privateKey = process.env.WALLET_PRIVATE;

const main = async () => {
    const eventList = await listenEvents(
        sepoliaProvider,
        privateKey,
        contractAbi,
        contractAddress,
        eventName
    );

    eventList.forEach((e, i) => {
        console.log(
            `Transaction ${i + 1}: hash: ${e.transactionHash}, blockNumber: ${
                e.blockNumber
            }`
        );
    });
};

main();
