# Ink! Contract Deployment Guide

This guide provides step-by-step instructions for deploying the Pearl & Leaves loyalty program ink! contract to the Polkadot Asset Hub.

## Prerequisites

Before deploying the contract, ensure you have:

1. A Polkadot account with sufficient funds for deployment
   - For testnet: Westend Asset Hub (WND tokens)
   - For mainnet: Polkadot Asset Hub (DOT tokens)

2. Access to Polkadot.js Apps: https://polkadot.js.org/apps/

## Deployment Steps

### 1. Build the Contract

If you have Rust and cargo-contract installed locally:

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install cargo-contract
cargo install cargo-contract --force

# Build the contract
cd restaurant-loyalty-polkadot/contracts/pearl_leaves_loyalty
cargo contract build
```

The build process will generate a `.contract` file in the `target/ink` directory.

### 2. Deploy Using Polkadot.js Apps

1. **Access Polkadot.js Apps**:
   - Go to https://polkadot.js.org/apps/
   - In the top left corner, click on the network selection dropdown
   - For testnet: Select "Westend" under "Test Networks"
   - For mainnet: Select "Polkadot" under "Live Networks"

2. **Connect Your Account**:
   - Go to "Accounts" > "Accounts" in the left sidebar
   - If you haven't added your account yet, click "Add account" and follow the instructions
   - Ensure your account has sufficient funds for deployment

3. **Navigate to Contracts Section**:
   - Go to "Developer" > "Contracts" in the left sidebar

4. **Upload Your Contract Code**:
   - Click on "Upload & Deploy Code"
   - Click "Upload New Contract Code"
   - Select or drag and drop the `.contract` file from the `target/ink` directory
   - This file contains both the WASM code and the contract metadata

5. **Deploy Your Contract**:
   - After uploading, you'll see the contract's constructor
   - Enter "Pearl & Leaves" as the constructor parameter for `shop_name`
   - Set an appropriate gas limit (the UI will suggest a value)
   - Click "Deploy" and sign the transaction with your account

6. **Verify Deployment**:
   - Once deployed, your contract will appear under "Contracts"
   - You can interact with it by clicking on it and using the available methods
   - Test the `get_shop_name` method to verify it returns "Pearl & Leaves"

7. **Save Your Contract Address**:
   - Copy the contract address (it will look like "5C4hrfjw...")
   - You'll need this address to interact with the contract from your frontend

### 3. Interacting with Your Contract

After deployment, you can interact with your contract directly from Polkadot.js Apps:

1. **View Contract**: 
   - Go to "Developer" > "Contracts"
   - Find your contract in the list or use the "Add an existing contract" option if you know the address

2. **Call Contract Methods**:
   - `get_shop_name`: View the shop name (read-only)
   - `get_purchase_count`: Check purchase count for a customer (read-only)
   - `record_purchase`: Record a purchase for a customer (requires transaction)

### 4. Troubleshooting

If you encounter issues during deployment:

1. **Insufficient Funds**:
   - Ensure your account has enough tokens for deployment
   - For Westend testnet, you can get free tokens from the faucet in the Polkadot Discord

2. **Gas Estimation Failures**:
   - Try setting a higher gas limit manually
   - The UI will suggest a value, but you may need to increase it

3. **Contract Size Issues**:
   - The ink! contract is optimized for Polkadot and should not encounter the size limitations that affected the Solidity version
   - If you still face issues, try simplifying the contract further

4. **Network Connectivity**:
   - Ensure you have a stable internet connection
   - Try refreshing the page or using a different browser

### 5. Next Steps

After successful deployment:

1. Copy your contract address
2. Update your frontend application with this address
3. Test the full application to ensure proper integration

Remember that contracts deployed to testnets like Westend are perfect for testing but will need to be redeployed to mainnet for production use.
