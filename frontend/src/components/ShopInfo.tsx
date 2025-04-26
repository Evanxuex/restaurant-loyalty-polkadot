import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider, getContract, getRestaurantInfo } from '../utils/contractUtils';

interface ShopInfoProps {
  contractAddress: string;
}

const ShopInfo: React.FC<ShopInfoProps> = ({ contractAddress }) => {
  const [name, setName] = useState<string>('Pearl & Leaves');
  const [location, setLocation] = useState<string>('Boston, MA');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchShopInfo = async () => {
      if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
        setError('Contract address not set');
        setLoading(false);
        return;
      }

      try {
        const provider = getProvider();
        if (!provider) {
          setError('Provider not available');
          setLoading(false);
          return;
        }

        const contract = getContract(contractAddress, provider);
        if (!contract) {
          setError('Failed to initialize contract');
          setLoading(false);
          return;
        }

        // Try to get info from contract, but use default values if it fails
        try {
          const info = await getRestaurantInfo(contract);
          setName(info.name);
          setLocation(info.location);
        } catch (err) {
          console.log('Using default shop info');
          // Keep default values
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching shop info:', err);
        setError(err.message || 'Failed to fetch shop information');
        setLoading(false);
      }
    };

    fetchShopInfo();
  }, [contractAddress]);

  if (loading) {
    return <div className="shop-info loading">Loading shop information...</div>;
  }

  if (error) {
    return <div className="shop-info error">Error: {error}</div>;
  }

  return (
    <div className="shop-info">
      <h2>{name}</h2>
      <p>Location: {location}</p>
      <p>Earn an exclusive NFT after 10 purchases!</p>
    </div>
  );
};

export default ShopInfo;
