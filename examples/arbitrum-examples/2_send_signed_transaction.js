const { arbitrumSepoliaProvider } = require("../../configs/APIConfig");
const { sendEthBetweenAccounts } = require("../../utils/ethUtils");

const sender = process.env.ARB_SEP_WALLET_ADDRESS; // Your account address 1
const receiver = process.env.WALLET_ADDRESS; // Your account address 2

const privateKey = process.env.ARB_SEP_WALLET_PRIVATE; // Private key of account 1

const amount = "0.005";

const main = async () => {
    const {
        senderBalanceBefore,
        recieverBalanceBefore,
        tx,
        senderBalanceAfter,
        recieverBalanceAfter,
    } = await sendEthBetweenAccounts(
        arbitrumSepoliaProvider,
        sender,
        receiver,
        privateKey,
        amount
    );

    console.log(`Sender balance before: ${senderBalanceBefore}`);
    console.log(`Receiver balance before: ${recieverBalanceBefore}`);
    console.log("Transaction details:", tx);
    console.log(`Sender balance after: ${senderBalanceAfter}`);
    console.log(`Receiver balance after: ${recieverBalanceAfter}`);
};

main();

