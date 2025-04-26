import React from 'react';

interface NFTRewardProps {
  purchaseCount: number;
  onPurchase: () => void;
}

const NFTReward: React.FC<NFTRewardProps> = ({ purchaseCount, onPurchase }) => {
  const progressPercentage = (purchaseCount / 10) * 100;
  
  return (
    <div className="nft-reward">
      <h3>NFT Reward Program</h3>
      <p>Make 10 purchases to earn an exclusive Pearl & Leaves NFT!</p>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p>{purchaseCount} / 10 purchases</p>
      
      {purchaseCount < 10 ? (
        <button onClick={onPurchase}>
          Simulate Purchase
        </button>
      ) : (
        <div className="success-message">
          Congratulations! You've earned an NFT. Check your wallet soon!
        </div>
      )}
    </div>
  );
};

export default NFTReward;
