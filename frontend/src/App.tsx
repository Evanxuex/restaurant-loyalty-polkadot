import React, { useState, useEffect } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import ShopInfo from './components/ShopInfo';
import IssueBadge from './components/IssueBadge';
import BadgeList from './components/BadgeList';
import BadgeActions from './components/BadgeActions';
import Menu from './components/Menu';
import NFTReward from './components/NFTReward';
import { initContract, getPurchaseCount, recordPurchase } from './utils/inkContractUtils';
import logo from './logo.svg';

function App() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [isContractInitialized, setIsContractInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeContract = async () => {
      if (contractAddress) {
        const result = await initContract(contractAddress);
        setIsContractInitialized(result.success);
        
        if (!result.success) {
          console.error('Failed to initialize contract:', result.error);
        }
      }
    };
    
    initializeContract();
  }, [contractAddress]);

  useEffect(() => {
    const fetchPurchaseCount = async () => {
      if (isContractInitialized && customerAddress) {
        try {
          const result = await getPurchaseCount(customerAddress);
          if (result.success) {
            setPurchaseCount(result.count);
          }
        } catch (error) {
          console.error('Error fetching purchase count:', error);
        }
      }
    };
    
    fetchPurchaseCount();
  }, [isContractInitialized, customerAddress, refreshTrigger]);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    // Set customer address to wallet address by default
    if (!customerAddress) {
      setCustomerAddress(address);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const simulatePurchase = async () => {
    if (!isContractInitialized || !walletAddress || !customerAddress) {
      console.error('Cannot record purchase: contract not initialized or addresses missing');
      return;
    }
    
    try {
      // In a real implementation, you would get the signer from the wallet
      // For now, we'll just simulate the purchase by incrementing the count
      const result = await recordPurchase(walletAddress, customerAddress);
      if (result.success) {
        handleRefresh(); // Refresh to update the purchase count
      } else {
        console.error('Failed to record purchase');
        // For demo purposes, still increment the count
        if (purchaseCount < 10) {
          setPurchaseCount(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error recording purchase:', error);
      // For demo purposes, still increment the count
      if (purchaseCount < 10) {
        setPurchaseCount(prev => prev + 1);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} alt="Pearl & Leaves Logo" />
          Pearl & Leaves Loyalty
        </h1>
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

        <Menu />

        <NFTReward purchaseCount={purchaseCount} onPurchase={simulatePurchase} />

        {contractAddress && (
          <div className="shop-section">
            <ShopInfo contractAddress={contractAddress} />
          </div>
        )}

        {walletAddress && contractAddress && (
          <div className="admin-section">
            <h2>Admin Panel</h2>
            <IssueBadge 
              contractAddress={contractAddress} 
              walletAddress={walletAddress}
              onActionComplete={handleRefresh}
            />
            <BadgeActions 
              contractAddress={contractAddress} 
              walletAddress={walletAddress}
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
                refreshTrigger={refreshTrigger}
              />
            )}
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Pearl & Leaves Bubble Tea Loyalty Program on Polkadot Asset Hub via PolkaVM</p>
      </footer>
    </div>
  );
}

export default App;
