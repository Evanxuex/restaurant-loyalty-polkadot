import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/contractUtils';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [address, setAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setAddress(window.ethereum.selectedAddress);
        onConnect(window.ethereum.selectedAddress);
      }
    };
    
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          onConnect(accounts[0]);
        } else {
          setAddress('');
        }
      });
    }
  }, [onConnect]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      const address = await connectWallet();
      setAddress(address);
      onConnect(address);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="wallet-connect">
      {!address ? (
        <div>
          <button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="connect-button"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="wallet-info">
          <p>Connected: {address.substring(0, 6)}...{address.substring(address.length - 4)}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
