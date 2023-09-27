// ethUtils.js
const { ethers } = require("ethers");

async function sendEthBetweenAccounts(provider, sender, receiver, privateKey, amount) {
    const wallet = new ethers.Wallet(privateKey, provider);

    const senderBalanceBefore = await provider.getBalance(
        sender
    );
    const recieverBalanceBefore = await provider.getBalance(
        receiver
    );

    // Transaction
    const tx = await wallet.sendTransaction({
        to: receiver,
        value: ethers.utils.parseEther(amount),
    });

    await tx.wait();

    const senderBalanceAfter = await provider.getBalance(
        sender
    );
    const recieverBalanceAfter = await provider.getBalance(
        receiver
    );

    return {
        senderBalanceBefore: ethers.utils.formatEther(senderBalanceBefore),
        recieverBalanceBefore: ethers.utils.formatEther(recieverBalanceBefore),
        tx,
        senderBalanceAfter: ethers.utils.formatEther(senderBalanceAfter),
        recieverBalanceAfter: ethers.utils.formatEther(recieverBalanceAfter),
    };
}

async function sendContractTransaction(provider, signerAddress, signerPrivateKey, contractABI, contractAddress){
    
}

module.exports = {
    sendEthBetweenAccounts,
    sendContractTransaction,
};
