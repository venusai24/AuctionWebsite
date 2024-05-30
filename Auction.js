const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;

const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  // ... other auction details

  // Reference to bids collection
  bids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
  }];
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;


Auction.findById(auctionId).populate('bids').then(auction => {
    // auction.bids will contain an array of Bid documents with details
  });
  

  const currentBidElement = document.getElementById('currentBid');
  const bidButton = document.getElementById('bidButton');
  
  async function fetchCurrentBid() {
    try {
      const response = await fetch('/current-bid'); // Replace with your actual endpoint
      if (!response.ok) {
        throw new Error(`Error fetching current bid: ${response.statusText}`);
      }
      const data = await response.json();
      return data.currentBid; // Assuming the response contains 'currentBid' property
    } catch (error) {
      console.error("Error fetching current bid:", error);
      alert("Error: Could not fetch current bid.");
      return null; // Indicate error or handle it differently
    }
  }
  
  bidButton.addEventListener('click', async () => {
    try {
      const currentBid = await fetchCurrentBid();
      if (currentBid === null) {
        return; // Handle error fetching current bid
      }
  
      const newBidAmount = currentBid * 1.1; // 10% increase
  
      // Replace with your logic to send a bid request to the server (using fetch)
      const response = await fetch('/bid', {
        method: 'POST',
        body: JSON.stringify({ amount: newBidAmount }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response.ok) {
        throw new Error(`Error placing bid: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Bid successful:", data);
      currentBidElement.textContent = data.newBidAmount; // Update displayed bid
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Error: " + error.message);
    }
  });
  