import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import contractAbi from '../contracts/PearlLeavesLoyaltyAbi.json';

let api: ApiPromise | null = null;
let contract: ContractPromise | null = null;

// Initialize API and contract
export const initContract = async (contractAddress: string) => {
  try {
    // Connect to Westend
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    api = await ApiPromise.create({ provider: wsProvider });
    
    // Create contract instance
    contract = new ContractPromise(api, contractAbi, contractAddress);
    
    return { success: true };
  } catch (error) {
    console.error('Error initializing contract:', error);
    return { success: false, error };
  }
};

// Get shop name
export const getShopName = async () => {
  if (!api || !contract) return { success: false, error: 'Contract not initialized' };
  
  try {
    const { result, output } = await contract.query.getShopName(
      '', // Caller address, empty for read-only
      { gasLimit: -1 } // Max gas
    );
    
    if (result.isOk && output) {
      return { success: true, name: output.toString() };
    } else {
      return { success: false, error: 'Failed to get shop name' };
    }
  } catch (error) {
    console.error('Error getting shop name:', error);
    return { success: false, error };
  }
};

// Get purchase count
export const getPurchaseCount = async (customerAddress: string) => {
  if (!api || !contract) return { success: false, error: 'Contract not initialized' };
  
  try {
    const { result, output } = await contract.query.getPurchaseCount(
      '', // Caller address, empty for read-only
      { gasLimit: -1 }, // Max gas
      customerAddress
    );
    
    if (result.isOk && output) {
      return { success: true, count: output.toNumber() };
    } else {
      return { success: false, error: 'Failed to get purchase count' };
    }
  } catch (error) {
    console.error('Error getting purchase count:', error);
    return { success: false, error };
  }
};

// Record a purchase (requires transaction)
export const recordPurchase = async (senderAccount: any, customerAddress: string) => {
  if (!api || !contract) return { success: false, error: 'Contract not initialized' };
  
  try {
    // Create transaction
    const tx = contract.tx.recordPurchase(
      { gasLimit: -1 }, // Max gas
      customerAddress
    );
    
    // Sign and send transaction
    const result = await tx.signAndSend(senderAccount);
    
    return { success: true, result };
  } catch (error) {
    console.error('Error recording purchase:', error);
    return { success: false, error };
  }
};
