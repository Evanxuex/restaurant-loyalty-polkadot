import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider, getContract, getRestaurantInfo } from '../utils/contractUtils';

interface RestaurantInfoProps {
  contractAddress: string;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ contractAddress }) => {
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
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

        const info = await getRestaurantInfo(contract);
        setName(info.name);
        setLocation(info.location);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching restaurant info:', err);
        setError(err.message || 'Failed to fetch restaurant information');
        setLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, [contractAddress]);

  if (loading) {
    return <div className="restaurant-info loading">Loading restaurant information...</div>;
  }

  if (error) {
    return <div className="restaurant-info error">Error: {error}</div>;
  }

  return (
    <div className="restaurant-info">
      <h2>{name}</h2>
      <p>Location: {location}</p>
    </div>
  );
};

export default RestaurantInfo;
