// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Simplified Loyalty Contract for Pearl & Leaves
 * @dev A streamlined loyalty program for bubble tea shop with badges and NFT rewards
 */
contract SimplifiedLoyalty {
    // Shop information
    string public shopName;
    string public shopLocation;
    
    // Owner address
    address public owner;
    
    // Badge types (simplified to just 2 types)
    enum BadgeType { FIRST_VISIT, REGULAR }
    
    // Badge structure (simplified)
    struct Badge {
        BadgeType badgeType;
        uint256 issuedAt;
    }
    
    // Customer data structure
    mapping(address => Badge[]) private customerBadges;
    mapping(address => uint256) private purchaseCounts;
    
    // Events
    event BadgeIssued(address indexed customer, BadgeType badgeType);
    event BadgeRevoked(address indexed customer, uint256 badgeIndex);
    event NFTRewarded(address indexed customer);
    
    // Constructor
    constructor(string memory _shopName, string memory _shopLocation) {
        shopName = _shopName;
        shopLocation = _shopLocation;
        owner = msg.sender;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Issue a badge to a customer
    function issueBadge(address customer, BadgeType badgeType) external onlyOwner {
        customerBadges[customer].push(Badge({
            badgeType: badgeType,
            issuedAt: block.timestamp
        }));
        
        emit BadgeIssued(customer, badgeType);
    }
    
    // Revoke a badge from a customer
    function revokeBadge(address customer, uint256 badgeIndex) external onlyOwner {
        require(badgeIndex < customerBadges[customer].length, "Badge index out of bounds");
        
        // Remove badge by replacing with the last one and then popping
        uint256 lastIndex = customerBadges[customer].length - 1;
        if (badgeIndex != lastIndex) {
            customerBadges[customer][badgeIndex] = customerBadges[customer][lastIndex];
        }
        customerBadges[customer].pop();
        
        emit BadgeRevoked(customer, badgeIndex);
    }
    
    // Record a purchase and check for NFT reward
    function recordPurchase(address customer) external onlyOwner {
        purchaseCounts[customer]++;
        
        // If customer has made 10 purchases, reward an NFT
        if (purchaseCounts[customer] == 10) {
            emit NFTRewarded(customer);
        }
    }
    
    // Get the number of badges for a customer
    function getBadgeCount(address customer) external view returns (uint256) {
        return customerBadges[customer].length;
    }
    
    // Get badge details
    function getBadgeDetails(address customer, uint256 badgeIndex) external view returns (BadgeType, uint256) {
        require(badgeIndex < customerBadges[customer].length, "Badge index out of bounds");
        Badge memory badge = customerBadges[customer][badgeIndex];
        return (badge.badgeType, badge.issuedAt);
    }
    
    // Check if customer has a specific badge type
    function hasBadge(address customer, BadgeType badgeType) external view returns (bool) {
        for (uint256 i = 0; i < customerBadges[customer].length; i++) {
            if (customerBadges[customer][i].badgeType == badgeType) {
                return true;
            }
        }
        return false;
    }
    
    // Get purchase count
    function getPurchaseCount(address customer) external view returns (uint256) {
        return purchaseCounts[customer];
    }
}
