import React, { useState, useEffect } from 'react';
import { initContract, getPurchaseCount } from '../utils/inkContractUtils';

interface BadgeListProps {
  contractAddress: string;
  customerAddress: string;
  refreshTrigger: number;
}

const BadgeList: React.FC<BadgeListProps> = ({ contractAddress, customerAddress, refreshTrigger }) => {
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPurchaseCount = async () => {
      if (!contractAddress || !customerAddress) {
        return;
      }

      setLoading(true);
      setError('');

      try {
        // Initialize contract
        await initContract(contractAddress);
        
        // Get purchase count
        const result = await getPurchaseCount(customerAddress);
        
        if (result.success) {
          setPurchaseCount(result.count);
        } else {
          setError(`Failed to get purchase count: ${result.error}`);
        }
      } catch (err: any) {
        console.error('Error fetching purchase count:', err);
        setError(err.message || 'Failed to fetch purchase count');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseCount();
  }, [contractAddress, customerAddress, refreshTrigger]);

  if (loading) {
    return <div className="badge-list loading">Loading purchase history...</div>;
  }

  if (error) {
    return <div className="badge-list error">Error: {error}</div>;
  }

  // Determine badge status based on purchase count
  const hasBadges = purchaseCount > 0;
  const badgeTypes = [];
  
  if (purchaseCount >= 1) badgeTypes.push("First Visit");
  if (purchaseCount >= 3) badgeTypes.push("Regular Customer");
  if (purchaseCount >= 7) badgeTypes.push("Tea Connoisseur");
  if (purchaseCount >= 10) badgeTypes.push("Bubble Tea Master");

  return (
    <div className="badge-list">
      {hasBadges ? (
        <>
          <h3>Customer Badges</h3>
          <p>Total Purchases: {purchaseCount}</p>
          <ul>
            {badgeTypes.map((badge, index) => (
              <li key={index} className="badge-item">
                <span className="badge-name">{badge}</span>
              </li>
            ))}
          </ul>
          {purchaseCount >= 10 && (
            <div className="nft-earned">
              <p>🎉 NFT Reward Earned! 🎉</p>
            </div>
          )}
        </>
      ) : (
        <p>No purchases recorded for this customer yet.</p>
      )}
    </div>
  );
};

export default BadgeList;
