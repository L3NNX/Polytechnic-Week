
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  department: {
    type: String,
    required: true,
    enum: ['Mechanical', 'Civil', 'Electrical'],
    trim: true
  },
  sports: [{
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: true
    },
    participationDate: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);