import React, { useState } from 'react';
import { ethers } from 'ethers';
import { BadgeType, hasBadge, revokeBadge } from '../utils/contractUtils';

interface BadgeActionsProps {
  contractAddress: string;
  provider: ethers.providers.Web3Provider | null;
  onActionComplete: () => void;
}

const BadgeActions: React.FC<BadgeActionsProps> = ({ 
  contractAddress, 
  provider,
  onActionComplete 
}) => {
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [badgeType, setBadgeType] = useState<BadgeType>(BadgeType.FIRST_VISIT);
  const [badgeIndex, setBadgeIndex] = useState<string>('0');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const [hasBadgeResult, setHasBadgeResult] = useState<boolean | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCheckBadge = async () => {
    if (!customerAddress) {
      setError('Please enter a customer address');
      return;
    }

    if (!ethers.utils.isAddress(customerAddress)) {
      setError('Invalid customer address');
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

    setIsChecking(true);
    setError('');
    setHasBadgeResult(null);

    try {
      const contract = new ethers.Contract(
        contractAddress,
        require('../contracts/LoyaltyABI.json'),
        provider.getSigner()
      );

      const result = await hasBadge(contract, customerAddress, badgeType);
      setHasBadgeResult(result);
    } catch (err: any) {
      console.error('Error checking badge:', err);
      setError(err.message || 'Failed to check badge');
    } finally {
      setIsChecking(false);
    }
  };

  const handleRevokeBadge = async () => {
    if (!customerAddress) {
      setError('Please enter a customer address');
      return;
    }

    if (!ethers.utils.isAddress(customerAddress)) {
      setError('Invalid customer address');
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

    setIsRevoking(true);
    setError('');
    setTxHash('');

    try {
      const contract = new ethers.Contract(
        contractAddress,
        require('../contracts/LoyaltyABI.json'),
        provider.getSigner()
      );

      const index = parseInt(badgeIndex);
      if (isNaN(index) || index < 0) {
        throw new Error('Invalid badge index');
      }

      const hash = await revokeBadge(contract, customerAddress, index);
      setTxHash(hash);
      onActionComplete();
    } catch (err: any) {
      console.error('Error revoking badge:', err);
      setError(err.message || 'Failed to revoke badge');
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <div className="badge-actions">
      <div className="check-badge">
        <h3>Check Badge</h3>
        <div className="form-group">
          <label htmlFor="checkCustomerAddress">Customer Address:</label>
          <input
            type="text"
            id="checkCustomerAddress"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="0x..."
            disabled={isChecking}
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkBadgeType">Badge Type:</label>
          <select
            id="checkBadgeType"
            value={badgeType}
            onChange={(e) => setBadgeType(Number(e.target.value) as BadgeType)}
            disabled={isChecking}
          >
            <option value={BadgeType.FIRST_VISIT}>First Visit</option>
            <option value={BadgeType.REGULAR}>Regular Customer</option>
            <option value={BadgeType.GOURMET}>Gourmet Explorer</option>
            <option value={BadgeType.VIP}>VIP Status</option>
          </select>
        </div>
        <button onClick={handleCheckBadge} disabled={isChecking}>
          {isChecking ? 'Checking...' : 'Check Badge'}
        </button>
        {hasBadgeResult !== null && (
          <p className={hasBadgeResult ? 'success-message' : 'info-message'}>
            {hasBadgeResult 
              ? 'Customer has this badge!' 
              : 'Customer does not have this badge.'}
          </p>
        )}
      </div>

      <div className="revoke-badge">
        <h3>Revoke Badge</h3>
        <div className="form-group">
          <label htmlFor="revokeCustomerAddress">Customer Address:</label>
          <input
            type="text"
            id="revokeCustomerAddress"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            placeholder="0x..."
            disabled={isRevoking}
          />
        </div>
        <div className="form-group">
          <label htmlFor="revokeBadgeIndex">Badge Index:</label>
          <input
            type="number"
            id="revokeBadgeIndex"
            value={badgeIndex}
            onChange={(e) => setBadgeIndex(e.target.value)}
            min="0"
            disabled={isRevoking}
          />
        </div>
        <button onClick={handleRevokeBadge} disabled={isRevoking}>
          {isRevoking ? 'Revoking...' : 'Revoke Badge'}
        </button>
        {txHash && (
          <p className="success-message">
            Badge revoked successfully! Transaction: {txHash.substring(0, 10)}...
          </p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BadgeActions;
