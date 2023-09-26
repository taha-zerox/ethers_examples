const { ethers } = require("ethers");
const { sepoliaProvider, goerliProvider } = require("../configs/infuraConfig");

const sepoliaContractAbi = require("../build-info/SingleNumber.json");
const goerliContractAbi = require("../build-info/AppendNumber.json");

const sepoliaContractAddress = "0xda5dc69C28821341a6fbb647c3f1D2d4f1e0f73a";
const goerliContractAddress = "0xA5bA4eB72d56E378353B56AA482364f642C88620";

const sepContract = new ethers.Contract(
    sepoliaContractAddress,
    sepoliaContractAbi,
    sepoliaProvider
);

const goeContract = new ethers.Contract(
    goerliContractAddress,
    goerliContractAbi,
    goerliProvider
);

// sign the contract with the proper signer
const privateKey = process.env.GOERLI_WALLET_PRIVATE;
const wallet = new ethers.Wallet(privateKey, goerliProvider);
const signer = wallet.provider.getSigner(wallet.address);
const signedContract = goeContract.connect(signer);

// Create an event filter for the "NumberEmitted" event
const eventFilter = sepContract.filters.NumberEmitted();

// Start listening for events
const main = async () => {};
sepContract.on(eventFilter, async (events) => {
    console.log('SEPOLIA: New "NumberEmitted" event(s) detected:');

    const tx = await signedContract.populateTransaction.appendSingleNumber(3);
    const txResponse = await wallet.sendTransaction(tx);

    await txResponse.wait();

    console.log("GOERLI: Transaction hash:", txResponse.hash);
});
