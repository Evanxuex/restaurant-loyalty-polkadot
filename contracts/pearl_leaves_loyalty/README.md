# Pearl Leaves Loyalty Contract

This is a Rust implementation of the Pearl & Leaves loyalty program contract using ink!, Polkadot's native smart contract language.

## Contract Features
- Records purchases for customers
- Tracks progress toward 10-purchase NFT reward
- Emits events for purchases and rewards
- Restricts administrative functions to owner

## Building and Deploying

```bash
# Install the ink! contract development tools
cargo install cargo-contract --force

# Build the contract
cargo contract build

# Deploy using Polkadot.js Apps
# 1. Go to https://polkadot.js.org/apps/
# 2. Connect to Westend or your preferred network
# 3. Go to Developer > Contracts
# 4. Upload & Deploy the .contract file
```

## Integration with Frontend

To integrate this contract with your React frontend, you'll need to use the Polkadot.js API.

```javascript
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';

// Connect to Westend
const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

// Create contract instance (replace with your deployed contract address and ABI)
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const abi = YOUR_CONTRACT_ABI;
const contract = new ContractPromise(api, abi, contractAddress);

// Call contract methods
const { result, output } = await contract.query.getPurchaseCount(
  contractAddress,
  { gasLimit: -1 },
  customerAddress
);

// Record a purchase (requires transaction)
await contract.tx.recordPurchase({ gasLimit: -1 }, customerAddress)
  .signAndSend(senderAccount);
```
