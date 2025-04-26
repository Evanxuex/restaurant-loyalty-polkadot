# Restaurant Loyalty Program on Polkadot - Pearl & Leaves Edition

A blockchain-based loyalty program for Pearl & Leaves Bubble Tea using Polkadot Asset Hub via PolkaVM.

## Problem & Solution

### The Problem: Fragmented Loyalty Programs

Traditional bubble tea shop loyalty programs face several challenges:

- **Siloed Systems**: Each shop typically has its own isolated loyalty program, requiring customers to manage multiple accounts and cards.
- **Easy to Fake**: Paper punch cards and centralized databases are susceptible to fraud and manipulation.
- **Limited Engagement**: Traditional points systems often fail to create meaningful engagement with customers.
- **Lack of Transparency**: Customers have limited visibility into their rewards status and history.

### The Solution: On-Chain NFT Rewards

Our solution leverages blockchain technology to create a tamper-proof, engaging loyalty program:

- **Blockchain-Based**: Loyalty badges and NFT rewards are stored on the Polkadot Asset Hub blockchain, making them immutable and verifiable.
- **NFT Rewards**: Customers earn an exclusive NFT after 10 purchases, creating a collectible digital asset.
- **Gamified Experience**: Achievement-based badges create a more engaging experience than simple point accumulation.
- **Transparent**: All badge issuances and NFT rewards are publicly verifiable on the blockchain.

## Technical Implementation

### Architecture

This project consists of two main components:

1. **Smart Contract**: A Solidity contract deployed on Polkadot Asset Hub via PolkaVM
2. **Frontend Application**: A React application that interacts with the deployed contract

### Technologies Used

- **Polkadot Asset Hub**: A system parachain in the Polkadot ecosystem specialized for asset management
- **PolkaVM**: A RISC-V based virtual machine that enables Solidity smart contracts on Polkadot
- **Solidity**: Smart contract programming language
- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for frontend development
- **ethers.js**: Library for interacting with Ethereum-compatible blockchains
- **Polkadot.js API**: Library for interacting with Polkadot-based chains

### Smart Contract Features

The `Loyalty.sol` contract implements the following features:

- Shop information storage (name and location)
- Four badge types: First Visit, Regular Customer, Tea Connoisseur, and Bubble Tea Master
- Badge issuance to customer addresses
- Badge revocation functionality
- Badge status verification
- Ownership management
- NFT reward tracking for 10 purchases

### Frontend Features

The React frontend provides:

- Wallet connection via MetaMask
- Shop information display
- Complete menu display with prices and descriptions
- NFT reward progress tracking
- Admin panel for issuing and revoking badges
- Customer badge viewing interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Access to Westend Asset Hub testnet

### Contract Deployment

1. Access the Polkadot Remix IDE at https://remix.polkadot.io/
2. Create a new file named `Loyalty.sol` and paste the contract code from `/contracts/Loyalty.sol`
3. Compile the contract using Solidity compiler version 0.8.x
4. Connect MetaMask to Westend Asset Hub using these network settings:
   - Network Name: Westend Asset Hub
   - RPC URL: https://westend-asset-hub-rpc.polkadot.io
   - Chain ID: 1281
   - Currency Symbol: WND
5. Deploy the contract with constructor parameters:
   - Shop name (e.g., "Pearl & Leaves")
   - Shop location (e.g., "Boston, MA")
6. Save the deployed contract address for frontend configuration

### Frontend Setup

1. Clone this repository
2. Navigate to the frontend directory:
   ```
   cd restaurant-loyalty-polkadot/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`
6. Enter the deployed contract address in the "Contract Address" field
7. Connect your MetaMask wallet to interact with the application

## Usage Guide

### Admin Functions

As the contract owner (the address that deployed the contract), you can:

1. **Issue Badges**:
   - Enter a customer's wallet address
   - Select a badge type
   - Click "Issue Badge"

2. **Revoke Badges**:
   - Enter a customer's wallet address
   - Enter the badge index (starting from 0)
   - Click "Revoke Badge"

3. **Check Badge Status**:
   - Enter a customer's wallet address
   - Select a badge type
   - Click "Check Badge"

### Customer Functions

Any user can:

1. **View Badges**:
   - Enter a customer's wallet address in the "Customer Badges" section
   - View all badges issued to that address

2. **Track NFT Progress**:
   - See their progress toward earning an NFT (10 purchases required)
   - Use the "Simulate Purchase" button to test the functionality

## Menu

### Milk Teas
- **Classic Pearl Milk Tea** — $5.25
  (Black tea + milk + golden tapioca pearls)

### Fruit Teas
- **Mango Sunrise Tea** — $5.75
  (Mango + passionfruit tea + real mango bits)
- **Lychee Blossom Green Tea** — $5.50
  (Lychee-infused green tea)

### Specialty Drinks
- **Brown Sugar Cloud** — $6.25
  (Fresh milk + brown sugar syrup + brown sugar pearls)
- **Matcha Lemon Fizz** — $6.00
  (Sparkling matcha + lemon tea)
- **Strawberry Jasmine Tea** — $5.75
  (Jasmine tea + strawberry purée)
- **Honeydew Milk Tea** — $5.50
  (Honeydew flavor + milk)

### Add-Ons (+$0.75)
- Extra Boba (Pearls)
- Aloe Vera
- Lychee Jelly
- Crystal Boba
- Grass Jelly
- Pudding

## Badge Types

1. **First Visit Badge**:
   - Awarded for a customer's first visit to Pearl & Leaves
   - Entry-level achievement

2. **Regular Customer Badge**:
   - Awarded for visiting Pearl & Leaves 5 times
   - Recognizes customer loyalty

3. **Tea Connoisseur Badge**:
   - Awarded for trying at least 5 different drinks
   - Encourages menu exploration

4. **Bubble Tea Master Badge**:
   - Awarded for being an exceptional customer
   - Highest tier of recognition

## NFT Reward

After making 10 purchases at Pearl & Leaves, customers earn an exclusive NFT that represents their loyalty to the shop. This digital collectible is stored on the blockchain and can be viewed in any compatible wallet or NFT marketplace.

## Contract Address

The contract is deployed on Westend Asset Hub testnet at:
`[Contract Address Will Be Added After Deployment]`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Polkadot team for creating the Asset Hub and PolkaVM infrastructure
- Polkadot Hackathon Survival Guide for valuable resources and guidance
