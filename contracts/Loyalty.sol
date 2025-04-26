// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Restaurant Loyalty Badge System
 * @dev A simple loyalty badge system for a restaurant in Boston
 * @custom:dev-run-script ./scripts/deploy_with_polkavm.ts
 */
contract Loyalty {
    address public owner;
    string public restaurantName;
    string public restaurantLocation;
    
    // Badge types
    enum BadgeType { FIRST_VISIT, REGULAR, GOURMET, VIP }
    
    // Badge structure
    struct Badge {
        BadgeType badgeType;
        string name;
        string description;
        uint256 issuedAt;
        bool active;
    }
    
    // Mapping from customer address to their badges
    mapping(address => Badge[]) public customerBadges;
    
    // Events
    event BadgeIssued(address indexed customer, BadgeType badgeType, string name);
    event BadgeRevoked(address indexed customer, uint256 badgeIndex);
    
    // Constructor
    constructor(string memory _restaurantName, string memory _restaurantLocation) {
        owner = msg.sender;
        restaurantName = _restaurantName;
        restaurantLocation = _restaurantLocation;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the restaurant owner can call this function");
        _;
    }
    
    /**
     * @dev Issue a new badge to a customer
     * @param customer Address of the customer
     * @param badgeType Type of badge to issue
     */
    function issueBadge(address customer, BadgeType badgeType) external onlyOwner {
        string memory name;
        string memory description;
        
        if (badgeType == BadgeType.FIRST_VISIT) {
            name = "First Visit";
            description = "Awarded for your first visit to our restaurant";
        } else if (badgeType == BadgeType.REGULAR) {
            name = "Regular Customer";
            description = "Awarded for visiting our restaurant 5 times";
        } else if (badgeType == BadgeType.GOURMET) {
            name = "Gourmet Explorer";
            description = "Awarded for trying at least 10 different dishes";
        } else if (badgeType == BadgeType.VIP) {
            name = "VIP Status";
            description = "Awarded for being an exceptional customer";
        }
        
        Badge memory newBadge = Badge({
            badgeType: badgeType,
            name: name,
            description: description,
            issuedAt: block.timestamp,
            active: true
        });
        
        customerBadges[customer].push(newBadge);
        
        emit BadgeIssued(customer, badgeType, name);
    }
    
    /**
     * @dev Revoke a badge from a customer
     * @param customer Address of the customer
     * @param badgeIndex Index of the badge to revoke
     */
    function revokeBadge(address customer, uint256 badgeIndex) external onlyOwner {
        require(badgeIndex < customerBadges[customer].length, "Badge index out of bounds");
        require(customerBadges[customer][badgeIndex].active, "Badge already revoked");
        
        customerBadges[customer][badgeIndex].active = false;
        
        emit BadgeRevoked(customer, badgeIndex);
    }
    
    /**
     * @dev Get the number of badges a customer has
     * @param customer Address of the customer
     * @return Number of badges
     */
    function getBadgeCount(address customer) external view returns (uint256) {
        return customerBadges[customer].length;
    }
    
    /**
     * @dev Get badge details
     * @param customer Address of the customer
     * @param badgeIndex Index of the badge
     * @return Badge type, name, description, issuance time, and active status
     */
    function getBadgeDetails(address customer, uint256 badgeIndex) external view returns (
        BadgeType, string memory, string memory, uint256, bool
    ) {
        require(badgeIndex < customerBadges[customer].length, "Badge index out of bounds");
        
        Badge memory badge = customerBadges[customer][badgeIndex];
        return (
            badge.badgeType,
            badge.name,
            badge.description,
            badge.issuedAt,
            badge.active
        );
    }
    
    /**
     * @dev Check if a customer has a specific badge type
     * @param customer Address of the customer
     * @param badgeType Type of badge to check
     * @return True if the customer has an active badge of the specified type
     */
    function hasBadge(address customer, BadgeType badgeType) external view returns (bool) {
        for (uint256 i = 0; i < customerBadges[customer].length; i++) {
            if (customerBadges[customer][i].badgeType == badgeType && customerBadges[customer][i].active) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
