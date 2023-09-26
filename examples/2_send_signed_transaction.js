const { ethers } = require("ethers");
require("dotenv").config();

const provider_url = process.env.ETH_SEPOLIA_NODE;
const provider = new ethers.providers.JsonRpcProvider(provider_url);

const account1 = process.env.WALLET_ADDRESS; // Your account address 1
const account2 = process.env.WALLET_ADDRESS_2; // Your account address 2

const privateKey1 = process.env.WALLET_PRIVATE; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const amount = "0.025";

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1);
    const recieverBalanceBefore = await provider.getBalance(account2);

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

    const senderBalanceAfter = await provider.getBalance(account1);
    const recieverBalanceAfter = await provider.getBalance(account2);

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
