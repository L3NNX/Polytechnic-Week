const router = require('express').Router();
const Sport = require('../models/sportmodel');

// Get All Sports
router.route('/').get(async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching sports', 
      error: err.message 
    });
  }
});

// Add New Sport
router.route('/add').post(async (req, res) => {
  try {
    // Validate input
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ 
        message: 'Sport name is required' 
      });
    }

    // Check if sport already exists
    const existingSport = await Sport.findOne({ name });
    if (existingSport) {
      return res.status(409).json({ 
        message: 'Sport already exists' 
      });
    }

    const newSport = new Sport({ name });
    await newSport.save();
    
    res.status(201).json({ 
      message: 'Sport added successfully', 
      sport: newSport 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error adding sport', 
      error: err.message 
    });
  }
});

module.exports = router;
