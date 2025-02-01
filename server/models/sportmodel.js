const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum: [
      "100M RUNNING (BOYS)",
      "100M RUNNING (GIRLS)",
      "200M RUNNING (BOYS)",
      "200M RUNNING (GIRLS)",
      "1600M RELAY RACE (BOYS)",
      "1600M RELAY RACE (GIRLS)",
      "SHOT PUT (BOYS)",
      "SHOT PUT (GIRLS)",
      "TUG OF WAR (BOYS/GIRLS)",
      "JAVELIN (BOYS)",
      "JAVELIN (GIRLS)",
      "DISCUS THROW (GIRLS)",
      "DISCUS THROW (BOYS)",
      "KHO KHO (BOYS)",
      "SALAD COMPETITION",
      "RANGOLI (GIRLS)",
      "MEHENDI (GIRLS)",
      "LUNCH BREAK",
      "HIGH JUMP (BOYS)",
      "HIGH JUMP (GIRLS)",
      "LONG JUMP (GIRLS)",
      "LONG JUMP (BOYS)",
      "KHO KHO (GIRLS)",
      "KHO KHO (BOYS)",
      "MARATHON",
      "QUIZ",
      "ARM WRESTLING",
      "SOLO SONG (LOKO GEET)",
      "DIHA NAM",
      "GROUP DANCE",
      "DRAMA",
      "CULTURAL RALLY",
      "WALL MAGAZINE",
      "CULTURAL NIGHT"
    ],
    trim: true,
    maxlength: 50
  },
  category: {
    type: String,
    enum: ['Team', 'Individual','Event'],
    default: 'Team'
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
