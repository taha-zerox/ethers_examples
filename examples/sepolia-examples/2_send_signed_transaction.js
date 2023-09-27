const { ethers } = require("ethers");
const { sepoliaProvider } = require("../../configs/APIConfig");
const { sendEthBetweenAccounts } = require("../../utils/ethUtils");

const sender = process.env.WALLET_ADDRESS; // Your account address 1
const receiver = process.env.WALLET_ADDRESS_2; // Your account address 2

const privateKey = process.env.WALLET_PRIVATE; // Private key of account 1

const amount = "0.005";

const main = async () => {
    const {
        senderBalanceBefore,
        recieverBalanceBefore,
        tx,
        senderBalanceAfter,
        recieverBalanceAfter,
    } = await sendEthBetweenAccounts(sepoliaProvider, sender, receiver, privateKey, amount);

    console.log(`Sender balance before: ${senderBalanceBefore}`);
    console.log(`Receiver balance before: ${recieverBalanceBefore}`);
    console.log("Transaction details:", tx);
    console.log(`Sender balance after: ${senderBalanceAfter}`);
    console.log(`Receiver balance after: ${recieverBalanceAfter}`);
};

main();
