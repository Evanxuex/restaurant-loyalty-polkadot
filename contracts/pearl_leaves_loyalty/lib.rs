#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod pearl_leaves_loyalty {
    use ink_storage::{
        traits::SpreadAllocate,
        Mapping,
    };

    /// The loyalty contract storage.
    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct PearlLeavesLoyalty {
        /// Store shop name
        shop_name: String,
        /// Owner of the contract
        owner: AccountId,
        /// Mapping from customer account to purchase count
        purchase_counts: Mapping<AccountId, u32>,
    }

    /// Events emitted by the contract
    #[ink(event)]
    pub struct PurchaseRecorded {
        #[ink(topic)]
        customer: AccountId,
        count: u32,
    }

    #[ink(event)]
    pub struct NftRewarded {
        #[ink(topic)]
        customer: AccountId,
    }

    /// Errors that can occur in the contract
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Caller is not the owner
        NotOwner,
    }

    /// Type alias for the contract's result type
    pub type Result<T> = core::result::Result<T, Error>;

    impl PearlLeavesLoyalty {
        /// Constructor to initialize the contract
        #[ink(constructor)]
        pub fn new(shop_name: String) -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.shop_name = shop_name;
                contract.owner = Self::env().caller();
            })
        }

        /// Record a purchase for a customer
        #[ink(message)]
        pub fn record_purchase(&mut self, customer: AccountId) -> Result<()> {
            // Only owner can record purchases
            if self.env().caller() != self.owner {
                return Err(Error::NotOwner);
            }

            // Get current count and increment
            let count = self.purchase_counts.get(customer).unwrap_or(0) + 1;
            self.purchase_counts.insert(customer, &count);
            
            // Emit purchase recorded event
            self.env().emit_event(PurchaseRecorded {
                customer,
                count,
            });
            
            // If 10 purchases, emit NFT reward event
            if count == 10 {
                self.env().emit_event(NftRewarded {
                    customer,
                });
            }
            
            Ok(())
        }

        /// Get purchase count for a customer
        #[ink(message)]
        pub fn get_purchase_count(&self, customer: AccountId) -> u32 {
            self.purchase_counts.get(customer).unwrap_or(0)
        }

        /// Get shop name
        #[ink(message)]
        pub fn get_shop_name(&self) -> String {
            self.shop_name.clone()
        }
    }
}
