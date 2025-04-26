import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import WalletConnect from './components/WalletConnect';
import RestaurantInfo from './components/RestaurantInfo';
import IssueBadge from './components/IssueBadge';
import BadgeList from './components/BadgeList';
import BadgeActions from './components/BadgeActions';
import { getProvider } from './utils/contractUtils';

function App() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    if (walletAddress) {
      setProvider(getProvider());
    } else {
      setProvider(null);
    }
  }, [walletAddress]);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Loyalty Badge System</h1>
        <WalletConnect onConnect={handleWalletConnect} />
      </header>

      <main className="App-main">
        <div className="contract-address">
          <h3>Contract Address</h3>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter deployed contract address"
          />
        </div>

        {contractAddress && (
          <div className="restaurant-section">
            <RestaurantInfo contractAddress={contractAddress} />
          </div>
        )}

        {walletAddress && contractAddress && (
          <div className="admin-section">
            <h2>Admin Panel</h2>
            <IssueBadge 
              contractAddress={contractAddress} 
              provider={provider} 
            />
            <BadgeActions 
              contractAddress={contractAddress} 
              provider={provider}
              onActionComplete={handleRefresh}
            />
          </div>
        )}

        {contractAddress && (
          <div className="customer-section">
            <h2>Customer Badges</h2>
            <div className="customer-address">
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter customer address to view badges"
              />
            </div>
            {customerAddress && (
              <BadgeList 
                contractAddress={contractAddress} 
                customerAddress={customerAddress} 
                provider={provider}
                refreshTrigger={refreshTrigger}
              />
            )}
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Restaurant Loyalty Badge System on Polkadot Asset Hub via PolkaVM</p>
      </footer>
    </div>
  );
}

export default App;
