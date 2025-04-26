# Beginner's Guide to Restaurant Loyalty Badge System

This guide provides step-by-step instructions for setting up and using the Restaurant Loyalty Badge System, designed specifically for beginners with no prior blockchain experience.

## Setting Up MetaMask

1. **Install MetaMask**:
   - Go to [metamask.io](https://metamask.io/)
   - Click "Download" and follow the installation instructions for your browser
   - Create a new wallet and securely store your recovery phrase

2. **Configure MetaMask for Westend Asset Hub**:
   - Open MetaMask and click on the network dropdown at the top (usually says "Ethereum Mainnet")
   - Select "Add Network" and then "Add a network manually"
   - Enter the following details:
     - Network Name: `Westend Asset Hub`
     - RPC URL: `https://westend-asset-hub-rpc.polkadot.io`
     - Chain ID: `1281`
     - Currency Symbol: `WND`
   - Click "Save"

3. **Get Testnet Tokens**:
   - Go to the Westend faucet (search for "Polkadot Westend faucet")
   - Connect your MetaMask wallet
   - Request some WND tokens for testing

## Deploying the Smart Contract

1. **Access Polkadot Remix IDE**:
   - Go to [remix.polkadot.io](https://remix.polkadot.io/)
   - You'll see the Remix IDE interface with a file explorer on the left

2. **Create a New Contract File**:
   - Click on the "New File" button in the Files section
   - Name the file `Loyalty.sol`
   - Copy the entire contract code from the `/contracts/Loyalty.sol` file in this repository
   - Paste it into the editor

3. **Compile the Contract**:
   - Click on the "Solidity Compiler" tab in the left sidebar (icon looks like an "S")
   - Make sure the compiler version is set to 0.8.x (preferably 0.8.28)
   - Check that "Enable optimization" is selected with runs set to 200
   - Click the "Compile Loyalty.sol" button
   - Look for a green checkmark indicating successful compilation

4. **Deploy the Contract**:
   - Click on the "Deploy & Run Transactions" tab in the left sidebar (icon looks like a play button)
   - In the "Environment" dropdown, select "PolkaVM Provider"
   - This will prompt MetaMask to connect - approve the connection
   - Make sure your MetaMask is set to the Westend Asset Hub network
   - In the "Contract" dropdown, select "Loyalty"
   - In the constructor parameters, enter:
     - First parameter (string): Your restaurant name (e.g., "Boston Bistro")
     - Second parameter (string): Your restaurant location (e.g., "Boston, MA")
   - Click the "Deploy" button
   - Confirm the transaction in MetaMask
   - Wait for the transaction to be confirmed

5. **Save Your Contract Address**:
   - After deployment, you'll see your contract under "Deployed Contracts"
   - Copy the contract address (it starts with "0x")
   - Save this address as you'll need it for the frontend

## Running the Frontend Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/restaurant-loyalty-polkadot.git
   cd restaurant-loyalty-polkadot
   ```

2. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```
   This will open the application in your browser at `http://localhost:3000`

4. **Connect to Your Contract**:
   - Enter your deployed contract address in the "Contract Address" field
   - Click "Connect Wallet" to connect your MetaMask
   - Approve the connection in the MetaMask popup

## Using the Application

### As a Restaurant Owner (Admin)

1. **Issue Badges to Customers**:
   - In the Admin Panel, find the "Issue Badge" section
   - Enter the customer's wallet address
   - Select the badge type (First Visit, Regular Customer, etc.)
   - Click "Issue Badge"
   - Confirm the transaction in MetaMask

2. **Revoke Badges**:
   - In the Admin Panel, find the "Revoke Badge" section
   - Enter the customer's wallet address
   - Enter the badge index (0 for the first badge, 1 for the second, etc.)
   - Click "Revoke Badge"
   - Confirm the transaction in MetaMask

3. **Check Badge Status**:
   - In the Admin Panel, find the "Check Badge" section
   - Enter the customer's wallet address
   - Select the badge type
   - Click "Check Badge"
   - The result will show whether the customer has that badge

### As a Customer

1. **View Your Badges**:
   - In the Customer Badges section, enter your wallet address
   - All your badges will be displayed with their details
   - Active badges are highlighted, while revoked badges are grayed out

## Troubleshooting

1. **MetaMask Not Connecting**:
   - Make sure you're on the Westend Asset Hub network in MetaMask
   - Try refreshing the page and reconnecting

2. **Transaction Failing**:
   - Check that you have enough WND tokens for gas fees
   - Verify you're using the correct contract address
   - If you're not the restaurant owner, you can't issue or revoke badges

3. **Contract Address Not Working**:
   - Double-check that you've copied the entire address correctly
   - Verify the contract was deployed successfully on Westend Asset Hub

4. **Frontend Not Loading**:
   - Make sure you've installed all dependencies with `npm install`
   - Check the console for any error messages

## Getting Help

If you encounter any issues or have questions, please:
- Check the main README.md file for more detailed information
- Join the Polkadot Discord and ask in the solidity-smart-contracts channel
- Open an issue on the GitHub repository

Remember, this is a testnet application, so all transactions are using test tokens and no real value is exchanged.
