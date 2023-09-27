const { ethers } = require("ethers");
const { arbitrumSepoliaProvider } = require("../../configs/APIConfig");

const account1 = process.env.ARB_SEP_WALLET_ADDRESS; // Your account address 1
const account2 = process.env.WALLET_ADDRESS; // Your account address 2

const privateKey1 = process.env.ARB_SEP_WALLET_PRIVATE; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, arbitrumSepoliaProvider);

const amount = "0.005";

const main = async () => {
    const senderBalanceBefore = await arbitrumSepoliaProvider.getBalance(
        account1
    );
    const recieverBalanceBefore = await arbitrumSepoliaProvider.getBalance(
        account2
    );

    console.log(
        `\nSender balance before: ${ethers.utils.formatEther(
            senderBalanceBefore
        )}`
    );
    console.log(
        `reciever balance before: ${ethers.utils.formatEther(
            recieverBalanceBefore
        )}\n`
    );

    // transaction
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther(amount),
    });

    await tx.wait();
    console.log(tx);

    const senderBalanceAfter = await arbitrumSepoliaProvider.getBalance(
        account1
    );
    const recieverBalanceAfter = await arbitrumSepoliaProvider.getBalance(
        account2
    );

    console.log(
        `\nSender balance after: ${ethers.utils.formatEther(
            senderBalanceAfter
        )}`
    );
    console.log(
        `reciever balance after: ${ethers.utils.formatEther(
            recieverBalanceAfter
        )}\n`
    );
};

main();
