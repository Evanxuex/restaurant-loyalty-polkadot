# Pearl & Leaves Loyalty Program

A blockchain-based loyalty program for Pearl & Leaves bubble tea shop, built on Polkadot Asset Hub via PolkaVM.

## Problem Statement

Traditional restaurant loyalty programs suffer from several limitations:
- Siloed systems that don't communicate with each other
- Susceptible to fraud and tampering
- Difficult to verify authenticity
- Limited portability between establishments

## Solution

The Pearl & Leaves Loyalty Program addresses these issues by implementing an on-chain, gamified points and badges system that is:
- Portable across different platforms
- Tamper-proof through blockchain verification
- Transparent and easily verifiable
- Engaging through gamification elements

## Features

- **Purchase Tracking**: Records customer purchases on the blockchain
- **Badge System**: Awards badges based on purchase milestones
  - First Visit: Awarded after first purchase
  - Regular Customer: Awarded after 3 purchases
  - Tea Connoisseur: Awarded after 7 purchases
  - Bubble Tea Master: Awarded after 10 purchases
- **NFT Rewards**: Issues an exclusive NFT after 10 purchases
- **Admin Panel**: Allows shop owners to issue badges and record purchases
- **Customer Dashboard**: Displays earned badges and progress toward rewards

## Technical Implementation

### Smart Contract

The loyalty program uses a custom ink! smart contract deployed on Polkadot Asset Hub. The contract:
- Stores shop information
- Tracks customer purchases
- Issues badges based on purchase count
- Emits events for purchases and NFT rewards

### Frontend

The React frontend integrates with the smart contract using Polkadot.js API:
- Connects to user wallets via Polkadot.js extension
- Displays the Pearl & Leaves menu
- Shows purchase progress toward NFT rewards
- Provides admin functionality for shop owners
- Displays customer badges and rewards

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

## Technology Stack

- **Smart Contract**: ink! on Polkadot Asset Hub
- **Frontend**: React with TypeScript
- **Blockchain Integration**: Polkadot.js API and ContractPromise
- **Styling**: CSS with responsive design

## Getting Started

### Prerequisites

- Node.js and npm
- Polkadot.js browser extension
- Access to Westend Asset Hub (testnet) or Polkadot Asset Hub (mainnet)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/restaurant-loyalty-polkadot.git
cd restaurant-loyalty-polkadot
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

### Contract Deployment

See [ink_contract_deployment.md](./docs/ink_contract_deployment.md) for detailed instructions on deploying the ink! contract to Polkadot Asset Hub.

### Frontend Deployment

See [frontend_deployment.md](./docs/frontend_deployment.md) for detailed instructions on deploying the frontend application.

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your Polkadot.js wallet.
2. **Enter Contract Address**: Input the deployed contract address in the designated field.
3. **Admin Functions**: If you're the shop owner (contract deployer), you can:
   - Record purchases for customers
   - Check badge status
4. **Customer View**: Customers can:
   - View their purchase count
   - See their earned badges
   - Track progress toward the NFT reward

## Project Structure

```
restaurant-loyalty-polkadot/
├── contracts/
│   ├── pearl_leaves_loyalty/    # ink! contract implementation
│   │   ├── Cargo.toml           # Contract dependencies
│   │   └── lib.rs               # Contract code
│   ├── Loyalty.sol              # Original Solidity contract (not used)
│   ├── SimplifiedLoyalty.sol    # Simplified Solidity version (not used)
│   └── MinimalLoyalty.sol       # Minimal Solidity version (not used)
├── frontend/
│   ├── public/                  # Static assets
│   └── src/
│       ├── components/          # React components
│       ├── contracts/           # Contract ABIs
│       ├── utils/               # Utility functions
│       └── App.tsx              # Main application
└── docs/                        # Documentation
    ├── ink_contract_deployment.md  # Contract deployment guide
    └── frontend_deployment.md      # Frontend deployment guide
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Polkadot and Parity Technologies for the Polkadot Asset Hub and PolkaVM
- The ink! team for the smart contract language
- The Polkadot.js team for the JavaScript API
