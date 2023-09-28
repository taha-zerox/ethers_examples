const { arbitrumSepoliaProvider } = require("../../configs/APIConfig");
const { sendContractTransaction } = require("../../utils/ethUtils");

const contractAbi = require("../../build-info/AppendNumber.json");

const contractAddress = "0x5Ec75f12104d85591768312a992555459b94d0B6"; // Our simple contract

const privateKey = process.env.WALLET_PRIVATE;

const transactionName = "appendSingleNumber";

const main = async () => {
    const { txResponse } = await sendContractTransaction(
        arbitrumSepoliaProvider,
        privateKey,
        contractAbi,
        contractAddress,
        transactionName
    );

    console.log(`Transaction hash: ${txResponse.hash}`);
};

main();
