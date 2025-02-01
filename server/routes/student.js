const router = require('express').Router();
const Student = require('../models/studentmodel');
const Sport = require('../models/sportmodel');

// Add student participation
router.route('/add').post(async (req, res) => {
  try {
    const { name, department, sports } = req.body;

    // Validate inputs
    if (!name || !department || !sports || !Array.isArray(sports)) {
      return res.status(400).json({ message: 'Name, department, and sports are required' });
    }

    // Validate sports exist
    for (const sportId of sports) {
      const sportExists = await Sport.findById(sportId);
      if (!sportExists) {
        return res.status(404).json({ message: `Sport with ID ${sportId} not found` });
      }
    }

    const newStudent = new Student({ 
      name, 
      department, 
      sports: sports.map(sportId => ({ sport: sportId })) 
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error adding student', error: err.message });
  }
});

// Get all students with sport details
router.route('/').get(async (req, res) => {
  try {
    const students = await Student.find().populate('sports.sport', 'name');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

module.exports = router;