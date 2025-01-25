require('dotenv').config();
const { ethers } = require("hardhat");

async function main() {
    // Retrieve deployer's private key from .env
    const deployerPrivateKey = process.env.PRIVATE_KEY;
    if (!deployerPrivateKey) {
        throw new Error("Please set your PRIVATE_KEY in a .env file");
    }

    const alchemyApiKey = process.env.INFURA_API_KEY;
    if (!alchemyApiKey) {
        throw new Error("Please set your PROJECT_ID in a .env file");
    }

    // Configure provider and wallet
    const provider = new ethers.InfuraProvider("sepolia", alchemyApiKey);
    const wallet = new ethers.Wallet(deployerPrivateKey, provider);
    // const uniswapRouter = process.env.UNISWAP_ROUTER_ADDRESS;
    // const uniswapFactory = process.env.UNISWAP_FACTORY_ADDRESS;
    // const ngnaAddress = process.env.NGNATOKEN_ADDRESS;
    // const daiAddress = process.env.DAITOKEN_ADDRESS;
    // const usdtAddress = process.env.USDTTOKEN_ADDRESS;
    // const collateral = process.env.COLLATERAL_MANAGER_ADDRESS;

    // // Get the contract factoryProjectId
    // const collateral = await ethers.getContractFactory("CollateralManager", wallet);
    const faucet = await ethers.getContractFactory("TokenFaucet", wallet);

    console.log("Deploying Faucet contract...");

    // Deploy the contract
    // const CollateralManager = await collateral.deploy();
    // console.log("Collateral manager deployed")
    // await CollateralManager.waitForDeployment();
    // console.log("Collateral Manager deployed to: ",await CollateralManager.getAddress());
    const Faucet = await faucet.deploy();
    console.log("Faucet deployed")
    await Faucet.waitForDeployment();
    console.log("Marketplace deployed to: ",await Faucet.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
