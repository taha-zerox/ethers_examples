const {
    sepoliaProvider,
    arbitrumSepoliaProvider,
} = require("../../configs/APIConfig");
const {
    sendContractTransaction,
    listenEvents,
} = require("../../utils/ethUtils");

const sepoliaContractAbi = require("../../build-info/SingleNumber.json");
const arbitrumSepoliaContractAbi = require("../../build-info/AppendNumber.json");

const sepoliaContractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a";
const arbitrumSepoliaContractAddress =
    "0x5Ec75f12104d85591768312a992555459b94d0B6";

const sepoliaEventName = "NumberEmitted";
const arbitrumSepoliaTransactionName = "appendSingleNumber";

const privateKey = process.env.WALLET_PRIVATE;

async function callback() {
    const { txResponse } = await sendContractTransaction(
        arbitrumSepoliaProvider,
        privateKey,
        arbitrumSepoliaContractAbi,
        arbitrumSepoliaContractAddress,
        arbitrumSepoliaTransactionName
    );

    console.log(`arbitrumSepolia: Transaction hash: ${txResponse.hash}`);
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
