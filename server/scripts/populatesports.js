const mongoose = require('mongoose');
const Sport = require('../models/sportmodel'); 
require('dotenv').config();
const sportsData = [
    { name: "100M RUNNING (BOYS)", category: "Individual", description: "100 meters sprint for boys" },
    { name: "100M RUNNING (GIRLS)", category: "Individual", description: "100 meters sprint for girls" },
    { name: "200M RUNNING (BOYS)", category: "Individual", description: "200 meters sprint for boys" },
    { name: "200M RUNNING (GIRLS)", category: "Individual", description: "200 meters sprint for girls" },
    { name: "1600M RELAY RACE (BOYS)", category: "Team", description: "4x400 meters relay race for boys" },
    { name: "1600M RELAY RACE (GIRLS)", category: "Team", description: "4x400 meters relay race for girls" },
    { name: "SHOT PUT (BOYS)", category: "Individual", description: "Throwing a heavy spherical object for distance" },
    { name: "SHOT PUT (GIRLS)", category: "Individual", description: "Throwing a heavy spherical object for distance" },
    { name: "TUG OF WAR (BOYS/GIRLS)", category: "Team", description: "Teams compete to pull the opposing team across a central line" },
    { name: "JAVELIN (BOYS)", category: "Individual", description: "Throwing a spear-like object for distance" },
    { name: "JAVELIN (GIRLS)", category: "Individual", description: "Throwing a spear-like object for distance" },
    { name: "DISCUS THROW (BOYS)", category: "Individual", description: "Throwing a heavy disc for distance" },
    { name: "DISCUS THROW (GIRLS)", category: "Individual", description: "Throwing a heavy disc for distance" },
    { name: "KHO KHO (BOYS)", category: "Team", description: "Traditional Indian tag game played by two teams" },
    { name: "KHO KHO (GIRLS)", category: "Team", description: "Traditional Indian tag game played by two teams" },
    { name: "SALAD COMPETITION", category: "Event", description: "Competition to prepare the most creative salad" },
    { name: "RANGOLI (GIRLS)", category: "Individual", description: "Artistic design competition using colored powders" },
    { name: "MEHENDI (GIRLS)", category: "Individual", description: "Henna application competition for intricate designs" },
    { name: "HIGH JUMP (BOYS)", category: "Individual", description: "Jumping over a horizontal bar set at varying heights" },
    { name: "HIGH JUMP (GIRLS)", category: "Individual", description: "Jumping over a horizontal bar set at varying heights" },
    { name: "LONG JUMP (BOYS)", category: "Individual", description: "Jumping as far as possible from a take-off point" },
    { name: "LONG JUMP (GIRLS)", category: "Individual", description: "Jumping as far as possible from a take-off point" },
    { name: "MARATHON", category: "Individual", description: "Long-distance running event covering 42.195 kilometers" },
    { name: "QUIZ", category: "Event", description: "Competition testing general knowledge across various subjects" },
    { name: "ARM WRESTLING", category: "Individual", description: "Competition to determine strength by pinning the opponent's arm" },
    { name: "SOLO SONG (LOKO GEET)", category: "Individual", description: "Solo singing competition featuring traditional Assamese folk songs" },
    { name: "DIHA NAM", category: "Individual", description: "Traditional Assamese dance performance competition" },
    { name: "GROUP DANCE", category: "Team", description: "Dance performance by a group showcasing coordinated choreography" },
    { name: "DRAMA", category: "Team", description: "Theatrical performance by a group depicting a story or theme" },
    { name: "CULTURAL RALLY", category: "Event", description: "Parade showcasing cultural diversity and traditions" },
    { name: "WALL MAGAZINE", category: "Event", description: "Competition for creating informative and artistic wall displays" },
    { name: "CULTURAL NIGHT", category: "Event", description: "Evening event featuring various cultural performances and activities" }
  ];
  

mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // return Sport.insertMany(sportsData);
    for (const sport of sportsData) {
        await Sport.updateOne(
          { name: sport.name },
          { $set: sport },
          { upsert: true }
        );
        console.log(`Upserted: ${sport.name}`);
      }
      mongoose.disconnect();
    
  })
  .then(() => {
    console.log('Sports data inserted successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error inserting sports data:', err);
  });
