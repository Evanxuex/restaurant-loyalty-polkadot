import React, { useState, useEffect } from 'react';
import { initContract, recordPurchase } from '../utils/inkContractUtils';

interface IssueBadgeProps {
  contractAddress: string;
  walletAddress: string;
  onActionComplete: () => void;
}

const IssueBadge: React.FC<IssueBadgeProps> = ({ contractAddress, walletAddress, onActionComplete }) => {
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [isIssuing, setIsIssuing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleIssueBadge = async () => {
    if (!customerAddress) {
      setError('Please enter a customer address');
      return;
    }

    setIsIssuing(true);
    setError('');
    setSuccess('');

    try {
      // Initialize contract if needed
      await initContract(contractAddress);
      
      // Record a purchase for the customer (simulates issuing a badge)
      const result = await recordPurchase(walletAddress, customerAddress);
      
      if (result.success) {
        setSuccess(`Successfully recorded purchase for ${customerAddress}`);
        onActionComplete();
      } else {
        setError(`Failed to record purchase: ${result.error}`);
      }
    } catch (err: any) {
      console.error('Error issuing badge:', err);
      setError(err.message || 'Failed to issue badge');
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="issue-badge">
      <h3>Record Purchase / Issue Badge</h3>
      <div className="form-group">
        <label>Customer Address:</label>
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          placeholder="Enter customer address"
        />
      </div>
      
      <button 
        onClick={handleIssueBadge}
        disabled={isIssuing || !contractAddress || !walletAddress}
      >
        {isIssuing ? 'Processing...' : 'Record Purchase'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default IssueBadge;
