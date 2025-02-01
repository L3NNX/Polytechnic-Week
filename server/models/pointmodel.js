const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new Schema({
  sport: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sport', 
    required: true 
  },
  department: { 
    type: String, 
    required: true,
    enum: ['Mechanical', 'Civil', 'Electrical'],
    trim: true
  },
  points: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  }
}, { 
  timestamps: true 
});

// Compound index to prevent duplicate entries
pointSchema.index({ sport: 1, department: 1, date: 1 }, { unique: true });

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
