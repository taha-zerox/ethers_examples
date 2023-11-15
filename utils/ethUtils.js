// ethUtils.js
const { ethers } = require("ethers");

async function sendEthBetweenAccounts(
    provider,
    sender,
    receiver,
    privateKey,
    amount
) {
    const wallet = new ethers.Wallet(privateKey, provider);

    const senderBalanceBefore = await provider.getBalance(sender);
    const recieverBalanceBefore = await provider.getBalance(receiver);

    // Transaction
    const tx = await wallet.sendTransaction({
        to: receiver,
        value: ethers.utils.parseEther(amount),
    });

    await tx.wait();

    const senderBalanceAfter = await provider.getBalance(sender);
    const recieverBalanceAfter = await provider.getBalance(receiver);

    return {
        senderBalanceBefore: ethers.utils.formatEther(senderBalanceBefore),
        recieverBalanceBefore: ethers.utils.formatEther(recieverBalanceBefore),
        tx,
        senderBalanceAfter: ethers.utils.formatEther(senderBalanceAfter),
        recieverBalanceAfter: ethers.utils.formatEther(recieverBalanceAfter),
    };
}

async function sendContractTransaction(
    provider,
    signerPrivateKey,
    contractABI,
    contractAddress,
    transactionName
) {
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
    );

    // sign the contract with the proper signer
    const wallet = new ethers.Wallet(signerPrivateKey, provider);
    const signer = wallet.provider.getSigner(wallet.address);
    const signedContract = contract.connect(signer);

    const tx = await signedContract.populateTransaction[transactionName](3);
    const txResponse = await wallet.sendTransaction(tx);

    await txResponse.wait();

    return {
        txResponse: txResponse,
    };
}

async function fetchEvents(
    provider,
    signerPrivateKey,
    contractABI,
    contractAddress,
    eventName,
    blockRange = 1000000
) {
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
    );

    // sign the contract with the proper signer
    const wallet = new ethers.Wallet(signerPrivateKey, provider);
    const signer = wallet.provider.getSigner(wallet.address);
    const signedContract = contract.connect(signer);

    const block = await provider.getBlockNumber();

    // await the event
    const transferEvents = await signedContract.queryFilter(
        eventName,
        block - blockRange,
        block
    );

    return transferEvents;
}

async function listenEvents(
    provider,
    contractABI,
    contractAddress,
    eventName,
    callback
) {
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
    );

    // Create an event filter for the event
    const eventFilter = contract.filters[eventName]();

    // Start listening for events
    contract.on(eventFilter, async () => {
        console.log(`New ${eventName} event detected`);

        callback();
    });
}

module.exports = {
    sendEthBetweenAccounts,
    sendContractTransaction,
    fetchEvents,
    listenEvents,
};
