require('dotenv').config();
const { WebSocketProvider, Contract } = require('ethers');

// WebSocket provider configuration
const bnbProviderUrl = process.env.BNB_WSS_URL;

// Contract configuration
const bnbVaultAddress = process.env.BNB_VAULT_ADDRESS;
const bnbVaultABI = require('./abis/bnbVaultABI.json');

// Main function to listen to events
const main = async () => {
  try {
    // Create WebSocket provider for BNB Smart Chain
    const bnbProvider = new WebSocketProvider(bnbProviderUrl);

    // Create contract instance for BNB Vault
    const bnbVaultContract = new Contract(bnbVaultAddress, bnbVaultABI, bnbProvider);

    console.log(`Listening for TokenPurchase events on ${bnbVaultAddress}...`);

    // Listen for TokenPurchase events on BNB Smart Chain
    bnbVaultContract.on('TokenPurchase', async (buyer, amount, value, chainId, event) => {
      console.log('TokenPurchase event triggered:', {
        buyer: buyer,
        amount: amount.toString(),
        value: value.toString(),
        chainId: chainId.toString(),
        data: event,
      });

      // Handle the event
      await handleTokenPurchase(buyer, amount, value, chainId);
    });

  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle the TokenPurchase event
async function handleTokenPurchase(buyer, amount, value, chainId) {
  console.log(`Processing purchase for buyer ${buyer} with amount ${amount.toString()} and value ${value.toString()} on chain ${chainId.toString()}.`);

  // Perform additional logic here, such as interacting with another contract
  // For example, you could send a transaction to update a presale contract
}

main();
