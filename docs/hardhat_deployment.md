# Hardhat Deployment Guide for Polkadot Loyalty Contract

This guide provides step-by-step instructions for deploying your restaurant loyalty smart contract to Polkadot Asset Hub using Hardhat.

## Why Hardhat for Polkadot?

Hardhat offers several advantages for deploying to Polkadot:

1. **Familiar Ethereum Tooling**: If you're coming from Ethereum development, Hardhat provides a familiar environment
2. **Testing Capabilities**: Robust testing framework for your contracts before deployment
3. **Deployment Scripts**: Automated deployment with configurable parameters
4. **Plugin System**: Specialized plugins for Polkadot integration

## Prerequisites

- Node.js (v16+) and npm/yarn/pnpm installed
- Git installed
- Basic knowledge of JavaScript and Solidity
- MetaMask wallet with Westend testnet WND tokens

## Setup Instructions

### 1. Install Hardhat and Polkadot Plugins

Create a new directory for your Hardhat project and initialize it:

```bash
mkdir loyalty-hardhat
cd loyalty-hardhat
npm init -y
npm install --save-dev hardhat
npx hardhat init
# Select "Create a JavaScript project"
```

Install the Polkadot plugins:

```bash
npm install --save-dev @paritytech/hardhat-polkadot-resolc @paritytech/hardhat-polkadot-node
```

### 2. Configure Hardhat for Polkadot

Update your `hardhat.config.js` file:

```javascript
require("@paritytech/hardhat-polkadot-resolc");
require("@paritytech/hardhat-polkadot-node");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Local development network
    polkadotDev: {
      url: "http://127.0.0.1:9944",
      chainId: 1337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
    // Westend Asset Hub testnet
    westendAssetHub: {
      url: "https://westend-asset-hub-rpc.polkadot.io",
      chainId: 1000,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  polkadot: {
    // Polkadot-specific configurations
    resolc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

### 3. Set Up Environment Variables

Create a `.env` file in your project root (make sure to add it to `.gitignore`):

```
PRIVATE_KEY=your_private_key_here
```

Install the dotenv package:

```bash
npm install --save-dev dotenv
```

Update the hardhat.config.js to use the environment variables:

```javascript
require("@paritytech/hardhat-polkadot-resolc");
require("@paritytech/hardhat-polkadot-node");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

// Rest of the config remains the same
```

### 4. Copy Your Loyalty Contract

Copy your `MinimalLoyalty.sol` or `SimplifiedLoyalty.sol` contract to the `contracts/` directory.

### 5. Create a Deployment Script

Create a file named `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying Loyalty contract...");

  // Get the contract factory
  const Loyalty = await hre.ethers.getContractFactory("MinimalLoyalty");
  
  // Deploy the contract with constructor arguments
  // Replace "Pearl & Leaves" with your restaurant name
  const loyalty = await Loyalty.deploy("Pearl & Leaves");

  // Wait for deployment to finish
  await loyalty.waitForDeployment();
  
  const address = await loyalty.getAddress();
  console.log(`Loyalty contract deployed to: ${address}`);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### 6. Test Locally First

Start a local Polkadot node:

```bash
npx hardhat polkadot-node
```

In a new terminal, deploy to the local node:

```bash
npx hardhat run scripts/deploy.js --network polkadotDev
```

### 7. Deploy to Westend Asset Hub

Once your local deployment works, deploy to the testnet:

```bash
npx hardhat run scripts/deploy.js --network westendAssetHub
```

### 8. Verify Your Contract (Optional)

The Polkadot ecosystem has different verification methods than Ethereum. You can verify your contract on Blockscout:

1. Visit the [Westend Asset Hub Blockscout Explorer](https://westend-asset-hub.blockscout.com/)
2. Search for your contract address
3. Go to the "Code" tab
4. Click "Verify & Publish"
5. Select the compiler version and optimization settings
6. Upload your contract source code

## Troubleshooting

### Gas Estimation Failed

If you encounter "Gas Estimation Failed" errors:

1. Ensure your MetaMask has sufficient WND tokens
2. Try manually setting a higher gas limit in your deployment script:

```javascript
const loyalty = await Loyalty.deploy("Pearl & Leaves", {
  gasLimit: 5000000
});
```

### Contract Size Too Large

If your contract is too large:

1. Enable the optimizer with higher runs in hardhat.config.js
2. Simplify your contract by removing unnecessary functions
3. Split functionality across multiple contracts

### RPC Connection Issues

If you have trouble connecting to the Westend Asset Hub:

1. Try an alternative RPC endpoint: `https://westend-asset-hub-rpc.dwellir.com`
2. Check if the network is experiencing issues on [Polkadot Status](https://status.polkadot.network/)

## Next Steps

After successful deployment:

1. Update your frontend to use the new contract address
2. Test all functionality on the testnet
3. When ready, follow the same process to deploy to the Polkadot Asset Hub mainnet

For more detailed information, refer to:
- [Hardhat Polkadot Documentation](https://github.com/paritytech/hardhat-polkadot)
- [Polkadot Smart Contract Documentation](https://use.ink/smart-contracts-polkadot/)
