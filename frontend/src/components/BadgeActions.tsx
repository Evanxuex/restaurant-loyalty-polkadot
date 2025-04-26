import React, { useState } from 'react';
import { initContract, recordPurchase } from '../utils/inkContractUtils';

interface BadgeActionsProps {
  contractAddress: string;
  walletAddress: string;
  onActionComplete: () => void;
}

const BadgeActions: React.FC<BadgeActionsProps> = ({ contractAddress, walletAddress, onActionComplete }) => {
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleRecordPurchase = async () => {
    if (!customerAddress) {
      setError('Please enter a customer address');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess('');

    try {
      // Initialize contract if needed
      await initContract(contractAddress);
      
      // Record a purchase for the customer
      const result = await recordPurchase(walletAddress, customerAddress);
      
      if (result.success) {
        setSuccess(`Successfully recorded purchase for ${customerAddress}`);
        onActionComplete();
      } else {
        setError(`Failed to record purchase: ${result.error}`);
      }
    } catch (err: any) {
      console.error('Error recording purchase:', err);
      setError(err.message || 'Failed to record purchase');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="badge-actions">
      <h3>Record Purchase</h3>
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
        onClick={handleRecordPurchase}
        disabled={isProcessing || !contractAddress || !walletAddress}
      >
        {isProcessing ? 'Processing...' : 'Record Purchase'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default BadgeActions;
