const { ethers } = require("ethers");
const { sepoliaProvider } = require("../../configs/APIConfig");

const main = async () => {
    const block = await sepoliaProvider.getBlockNumber();

    console.log(`\nBlock Number: ${block}\n`);

    const blockInfo = await sepoliaProvider.getBlock(block);

    console.log(blockInfo);

    const { transactions } = await sepoliaProvider.getBlockWithTransactions(block);

    console.log(`\nLogging first transaction in block:\n`);
    console.log(transactions[0]);
};

main();
