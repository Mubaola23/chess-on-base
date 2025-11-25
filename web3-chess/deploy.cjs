require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const { abi, bytecode } = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'artifacts', 'Chess.json')));

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();

    await contract.deploymentTransaction().wait(1);

    console.log(`Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
