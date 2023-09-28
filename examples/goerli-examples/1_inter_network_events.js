const { ethers } = require("ethers");
const { sepoliaProvider, goerliProvider } = require("../../configs/APIConfig");
const {
    sendContractTransaction,
    listenEvents,
} = require("../../utils/ethUtils");

const sepoliaContractAbi = require("../../build-info/SingleNumber.json");
const goerliContractAbi = require("../../build-info/AppendNumber.json");

const sepoliaContractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a";
const goerliContractAddress = "0xA5bA4eB72d56E378353B56AA482364f642C88620";

const sepoliaEventName = "NumberEmitted";
const goerliTransactionName = "appendSingleNumber";

const privateKey = process.env.GOERLI_WALLET_PRIVATE;

async function callback() {
    const { txResponse } = await sendContractTransaction(
        goerliProvider,
        privateKey,
        goerliContractAbi,
        goerliContractAddress,
        goerliTransactionName
    );

    console.log(`GOERLI: Transaction hash: ${txResponse.hash}`);
}

const main = async () => {
    await listenEvents(
        sepoliaProvider,
        sepoliaContractAbi,
        sepoliaContractAddress,
        sepoliaEventName,
        callback
    );
};

main();
