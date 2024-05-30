const express = require('express');
const mongoose = require('mongoose'); 


const mongoURI = 'mongodb://localhost:27017';
const Auction = mongoose.model('Auction', auctionSchema);
const Bid = mongoose.model('Bid', bidSchema);
const User = mongoose.model('User', User); 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();

// Route to handle bid requests 
app.post('/bid', async (req, res) => {
  const { amount } = req.body; // Extract bid amount from request body

  try {
    // Find the auction (replace with your logic to find the auction)
    const auction = await Auction.findOne(/* your criteria to find the auction */);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    
    let currentBid = 0;
    const bids = await Bid.find({ auction: auction._id });
    if (bids.length) {
      currentBid = Math.max(...bids.map(bid => bid.amount));
    }

    const newBidAmount = currentBid + (currentBid * 0.1); // Calculate new bid amount

    if (amount < newBidAmount) {
      return res.status(400).json({ message: 'Bid amount must be higher than previous bid' });
    }
}

    
    

    // Create a new bid document
    const newBid = new Bid({
      auction: auction._id,
      bidder:
    })