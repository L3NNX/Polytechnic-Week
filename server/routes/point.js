const router = require('express').Router();
const Point = require('../models/pointmodel');
const Sport = require('../models/sportmodel');

router.route('/').get(async (req, res) => {
  try {
    const points = await Point.find()
    res.json(points);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching points', 
      error: err.message 
    });
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const { sport, department, points } = req.body;

    if (!sport || !department || points === undefined) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Validate sport exists
    const sportExists = await Sport.findById(sport);
    if (!sportExists) {
      return res.status(404).json({ 
        message: 'Sport not found' 
      });
    }

    // Validate points range
    if (points < 0 || points > 100) {
      return res.status(400).json({ 
        message: 'Points must be between 0 and 100' 
      });
    }

    const newPoint = new Point({ 
      sport, 
      department, 
      points 
    });

    await newPoint.save();
    
    res.status(201).json({ 
      message: 'Points added successfully', 
      point: newPoint 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error adding points', 
      error: err.message 
    });
  }
});

// Delete Points Entry
router.route('/:id').delete(async (req, res) => {
  try {
    const point = await Point.findByIdAndDelete(req.params.id);
    
    if (!point) {
      return res.status(404).json({ 
        message: 'Points entry not found' 
      });
    }

    res.json({ 
      message: 'Points entry deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error deleting points entry', 
      error: err.message 
    });
  }
});

// Update Points Entry
router.route('/update/:id').put(async (req, res) => {
  try {
    const { sport, department, points } = req.body;

    // Find and update in one operation
    const updatedPoint = await Point.findOneAndUpdate(
      { _id: req.params.id },
      { 
        sport, 
        department, 
        points: Number(points),
        date: new Date() // Reset date to current timestamp
      },
      { 
        new: true,        // Return updated document
        runValidators: true // Enforce model validation
      }
    );

    if (!updatedPoint) {
      return res.status(404).json({ 
        message: 'Points entry not found' 
      });
    }

    res.json({ 
      message: 'Points entry updated successfully', 
      point: updatedPoint 
    });
  } catch (err) {
    // Handle potential unique constraint error
    if (err.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate entry not allowed',
        error: err.message 
      });
    }

    res.status(500).json({ 
      message: 'Error updating points entry', 
      error: err.message 
    });
  }
});


// Leaderboard Route
router.route('/leaderboard').get(async (req, res) => {
  try {
    const leaderboard = await Point.aggregate([
      {
        $group: {
          _id: '$department',
          totalPoints: { $sum: '$points' }
        }
      },
      {
        $sort: { totalPoints: -1 }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error generating leaderboard', 
      error: err.message 
    });
  }
});

module.exports = router;
