const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", 
  "https://polytechnic-week-jhoz.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define routes
const sportsRouter = require('./routes/sports');
const pointsRouter = require('./routes/point');
const studentRoutes = require('./routes/student');

app.use('/api/sports', sportsRouter);
app.use('/api/points', pointsRouter);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});