import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getAllBadges, Badge, formatBadgeType, formatTimestamp } from '../utils/contractUtils';

interface BadgeListProps {
  contractAddress: string;
  customerAddress: string;
  provider: ethers.providers.Web3Provider | null;
  refreshTrigger: number;
}

const BadgeList: React.FC<BadgeListProps> = ({ 
  contractAddress, 
  customerAddress, 
  provider,
  refreshTrigger 
}) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBadges = async () => {
      if (!customerAddress || !ethers.utils.isAddress(customerAddress)) {
        setBadges([]);
        return;
      }

      if (!provider) {
        setError('Wallet not connected');
        return;
      }

      if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
        setError('Contract address not set');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const contract = new ethers.Contract(
          contractAddress,
          require('../contracts/LoyaltyABI.json'),
          provider.getSigner()
        );

        const badgeList = await getAllBadges(contract, customerAddress);
        setBadges(badgeList);
      } catch (err: any) {
        console.error('Error fetching badges:', err);
        setError(err.message || 'Failed to fetch badges');
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [contractAddress, customerAddress, provider, refreshTrigger]);

  if (loading) {
    return <div className="badge-list loading">Loading badges...</div>;
  }

  if (error) {
    return <div className="badge-list error">Error: {error}</div>;
  }

  if (badges.length === 0) {
    return <div className="badge-list empty">No badges found for this customer</div>;
  }

  return (
    <div className="badge-list">
      <h3>Customer Badges</h3>
      <div className="badges-container">
        {badges.map((badge, index) => (
          <div key={index} className={`badge-card ${badge.active ? 'active' : 'revoked'}`}>
            <h4>{badge.name}</h4>
            <p>{badge.description}</p>
            <p className="badge-type">Type: {formatBadgeType(badge.badgeType)}</p>
            <p className="badge-date">Issued: {formatTimestamp(badge.issuedAt)}</p>
            <p className="badge-status">Status: {badge.active ? 'Active' : 'Revoked'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
