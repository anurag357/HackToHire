require('dotenv').config()
require("./config/database").connect()
const {PORT} = process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());
app.use(cors());

// Define a simple Flight schema
const flightSchema = new mongoose.Schema({
  name: String,
  status: String
});

const Flight = mongoose.model('Flight', flightSchema);

// Mock flight data
const mockFlights = [
  { id: 1, name: 'Flight A', status: 'On Time' },
  { id: 2, name: 'Flight B', status: 'Delayed' }
];

// API to get flights
app.get('/api/flights', (req, res) => {
  res.json(mockFlights);
});

// API to subscribe to flight notifications
app.post('/api/subscribe/:id', (req, res) => {
  const { id } = req.params;
  // Implement notification logic here
  res.send(`Subscribed to flight ${id}`);
});

// Start the server
app.listen(PORT , () => {
  console.log(`Server is running port on http://localhost/${PORT}`)
})
