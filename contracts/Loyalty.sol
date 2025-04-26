// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MinimalLoyalty {
    string public shopName;
    address public owner;
    
    mapping(address => uint256) private purchaseCounts;
    
    event PurchaseRecorded(address indexed customer, uint256 newCount);
    event NFTRewarded(address indexed customer);
    
    constructor(string memory _shopName) {
        shopName = _shopName;
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function recordPurchase(address customer) external onlyOwner {
        purchaseCounts[customer]++;
        emit PurchaseRecorded(customer, purchaseCounts[customer]);
        
        if (purchaseCounts[customer] == 10) {
            emit NFTRewarded(customer);
        }
    }
    
    function getPurchaseCount(address customer) external view returns (uint256) {
        return purchaseCounts[customer];
    }
}
