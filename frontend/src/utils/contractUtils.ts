import { ethers } from 'ethers';
import LoyaltyABI from '../contracts/LoyaltyABI.json';

// Enum to match the contract's BadgeType
export enum BadgeType {
  FIRST_VISIT = 0,
  REGULAR = 1,
  GOURMET = 2,
  VIP = 3
}

// Badge interface to match the contract's Badge struct
export interface Badge {
  badgeType: BadgeType;
  name: string;
  description: string;
  issuedAt: number;
  active: boolean;
}

// Default contract address - to be replaced with actual deployed address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// Network configuration for Westend Asset Hub
export const NETWORK_CONFIG = {
  chainId: '0x501', // 1281 in hex
  chainName: 'Westend Asset Hub',
  rpcUrls: ['https://westend-asset-hub-rpc.polkadot.io'],
  nativeCurrency: {
    name: 'WND',
    symbol: 'WND',
    decimals: 18
  }
};

// Get ethers provider
export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return null;
};

// Get contract instance
export const getContract = (address = CONTRACT_ADDRESS, provider: any) => {
  if (!provider) {
    return null;
  }
  
  const signer = provider.getSigner();
  return new ethers.Contract(address, LoyaltyABI, signer);
};

// Connect to MetaMask
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = getProvider();
      const accounts = await provider?.send('eth_requestAccounts', []);
      
      // Check if we're on the correct network
      const chainId = await provider?.send('eth_chainId', []);
      if (chainId !== NETWORK_CONFIG.chainId) {
        // Try to switch to the correct network
        try {
          await provider?.send('wallet_switchEthereumChain', [{ chainId: NETWORK_CONFIG.chainId }]);
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await provider?.send('wallet_addEthereumChain', [NETWORK_CONFIG]);
          } else {
            throw switchError;
          }
        }
      }
      
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      throw error;
    }
  } else {
    throw new Error("MetaMask is not installed");
  }
};

// Get restaurant info
export const getRestaurantInfo = async (contract: ethers.Contract) => {
  try {
    const name = await contract.restaurantName();
    const location = await contract.restaurantLocation();
    return { name, location };
  } catch (error) {
    console.error("Error getting restaurant info:", error);
    throw error;
  }
};

// Issue badge
export const issueBadge = async (contract: ethers.Contract, customerAddress: string, badgeType: BadgeType) => {
  try {
    const tx = await contract.issueBadge(customerAddress, badgeType);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error issuing badge:", error);
    throw error;
  }
};

// Get badge count
export const getBadgeCount = async (contract: ethers.Contract, customerAddress: string) => {
  try {
    const count = await contract.getBadgeCount(customerAddress);
    return count.toNumber();
  } catch (error) {
    console.error("Error getting badge count:", error);
    throw error;
  }
};

// Get badge details
export const getBadgeDetails = async (contract: ethers.Contract, customerAddress: string, badgeIndex: number) => {
  try {
    const [badgeType, name, description, issuedAt, active] = await contract.getBadgeDetails(customerAddress, badgeIndex);
    return {
      badgeType: badgeType,
      name,
      description,
      issuedAt: issuedAt.toNumber(),
      active
    } as Badge;
  } catch (error) {
    console.error("Error getting badge details:", error);
    throw error;
  }
};

// Check if customer has badge
export const hasBadge = async (contract: ethers.Contract, customerAddress: string, badgeType: BadgeType) => {
  try {
    return await contract.hasBadge(customerAddress, badgeType);
  } catch (error) {
    console.error("Error checking badge:", error);
    throw error;
  }
};

// Revoke badge
export const revokeBadge = async (contract: ethers.Contract, customerAddress: string, badgeIndex: number) => {
  try {
    const tx = await contract.revokeBadge(customerAddress, badgeIndex);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error revoking badge:", error);
    throw error;
  }
};

// Get all badges for a customer
export const getAllBadges = async (contract: ethers.Contract, customerAddress: string) => {
  try {
    const count = await getBadgeCount(contract, customerAddress);
    const badges: Badge[] = [];
    
    for (let i = 0; i < count; i++) {
      const badge = await getBadgeDetails(contract, customerAddress, i);
      badges.push(badge);
    }
    
    return badges;
  } catch (error) {
    console.error("Error getting all badges:", error);
    throw error;
  }
};

// Format badge type to readable string
export const formatBadgeType = (badgeType: BadgeType) => {
  switch (badgeType) {
    case BadgeType.FIRST_VISIT:
      return "First Visit";
    case BadgeType.REGULAR:
      return "Regular Customer";
    case BadgeType.GOURMET:
      return "Gourmet Explorer";
    case BadgeType.VIP:
      return "VIP Status";
    default:
      return "Unknown";
  }
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};
