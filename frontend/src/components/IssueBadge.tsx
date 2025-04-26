import React from 'react';
import { ethers } from 'ethers';
import { BadgeType, issueBadge } from '../utils/contractUtils';

interface IssueBadgeProps {
  contractAddress: string;
  provider: ethers.providers.Web3Provider | null;
}

const IssueBadge: React.FC<IssueBadgeProps> = ({ contractAddress, provider }) => {
  const [customerAddress, setCustomerAddress] = React.useState<string>('');
  const [badgeType, setBadgeType] = React.useState<BadgeType>(BadgeType.FIRST_VISIT);
  const [isIssuing, setIsIssuing] = React.useState<boolean>(false);
  const [txHash, setTxHash] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleIssue = async () => {
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

    setIsIssuing(true);
    setError('');
    setTxHash('');

    try {
      const contract = new ethers.Contract(
        contractAddress,
        require('../contracts/LoyaltyABI.json'),
        provider.getSigner()
      );

      const hash = await issueBadge(contract, customerAddress, badgeType);
      setTxHash(hash);
    } catch (err: any) {
      console.error('Error issuing badge:', err);
      setError(err.message || 'Failed to issue badge');
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="issue-badge">
      <h3>Issue Badge</h3>
      <div className="form-group">
        <label htmlFor="customerAddress">Customer Address:</label>
        <input
          type="text"
          id="customerAddress"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="0x..."
          disabled={isIssuing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="badgeType">Badge Type:</label>
        <select
          id="badgeType"
          value={badgeType}
          onChange={(e) => setBadgeType(Number(e.target.value) as BadgeType)}
          disabled={isIssuing}
        >
          <option value={BadgeType.FIRST_VISIT}>First Visit</option>
          <option value={BadgeType.REGULAR}>Regular Customer</option>
          <option value={BadgeType.GOURMET}>Tea Connoisseur</option>
          <option value={BadgeType.VIP}>Bubble Tea Master</option>
        </select>
      </div>
      <button onClick={handleIssue} disabled={isIssuing}>
        {isIssuing ? 'Issuing...' : 'Issue Badge'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {txHash && (
        <p className="success-message">
          Badge issued successfully! Transaction: {txHash.substring(0, 10)}...
        </p>
      )}
    </div>
  );
};

export default IssueBadge;
