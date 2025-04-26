# Restaurant Loyalty Program Research

## Polkadot Asset Hub and PolkaVM

- **Asset Hub**: A system parachain in the Polkadot ecosystem that specializes in the creation, management, and use of assets (tokens, NFTs) across the network.
- **PolkaVM**: A general purpose user-level RISC-V based virtual machine that enables smart contract deployment on Polkadot.
- PolkaVM is currently live on the Westend testnet (Polkadot's testnet).
- PolkaVM allows developers to use familiar Ethereum tools and libraries while leveraging Polkadot's ecosystem.

## Development Environments

- **Polkadot Remix IDE**: A web-based IDE that allows writing, testing, and deploying smart contracts directly in the browser.
- **Hardhat**: A popular Ethereum development environment that can be used for Polkadot smart contract development with custom plugins.

## Contract Interaction Libraries

Several libraries can be used to interact with smart contracts deployed on Polkadot:
- Ethers.js
- viem
- Web3.js
- Web3.py
- Wagmi

## Implementation Plan for Restaurant Loyalty Badge System

For our simple restaurant loyalty badge system for a Boston restaurant, we will:

1. Use **Polkadot Remix IDE** for development (web-based, quick to set up)
2. Write a **Solidity contract** for the loyalty badge system
3. Deploy to **Westend Asset Hub testnet** using PolkaVM
4. Create a simple **React frontend** with Polkadot.js API for interaction
5. Host the code on GitHub with MIT license

## Key Features for Our Implementation

- Simple badge issuance for customer achievements
- Focus on a single restaurant in Boston
- Tamper-proof badge records on blockchain
- Public verification of earned badges

## Technical Requirements

- Solidity contract deployed via PolkaVM on Westend Asset Hub
- React frontend with Polkadot.js API
- GitHub repository with proper documentation
- MIT license for open-source sharing
