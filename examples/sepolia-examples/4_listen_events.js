const { ethers } = require("ethers");
const { sepoliaProvider } = require("../../configs/APIConfig");

const contractAbi = require("../build-info/SingleNumber.json");

const contractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a"; // Our simple contract

const contract = new ethers.Contract(
    contractAddress,
    contractAbi,
    sepoliaProvider
);

// sign the contract with the proper signer
const privateKey = process.env.WALLET_PRIVATE;
const wallet = new ethers.Wallet(privateKey, sepoliaProvider);
const signer = wallet.provider.getSigner(wallet.address);
const signedContract = contract.connect(signer);

const main = async () => {
    const block = await sepoliaProvider.getBlockNumber();

    // await the event
    const transferEvents = await signedContract.queryFilter(
        "NumberEmitted",
        block - 1000,
        block
    );
    console.log(transferEvents);
};

main();
