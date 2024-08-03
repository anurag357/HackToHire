require('dotenv').config();
require("./config/database").connect();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Root endpoint
app.get('/', (req, res) => {
  console.log("hello!!");
  res.send("Hello, World!");
});

// API to get flights
app.get('/api/getFlights', (req, res) => {
  console.log('GET /api/flights');
  res.json(mockFlights);
});

app.post('/api/flights', async (req, res) => {
  try {
    const flights = req.body; // Expecting an array of flight objects
    console.log(flights)
    await Flight.insertMany(flights);
    res.status(201).send('Flights added successfully');
  } catch (error) {
    res.status(500).send('Error adding flights');
  }
});


// API to subscribe to flight notifications
app.post('/api/subscribe/:id', (req, res) => {
  const { id } = req.params;
  console.log(`POST /api/subscribe/${id}`);
  // Implement notification logic here
  res.send(`Subscribed to flight ${id}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// require('dotenv').config();
// require("./config/database").connect();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const admin = require('firebase-admin');

// const app = express();
// const {PORT} = process.env || 3000;

// app.use(express.json());
// app.use(cors());

// // Define a simple Flight schema
// const flightSchema = new mongoose.Schema({
//   name: String,
//   status: String
// });

// const Flight = mongoose.model('Flight', flightSchema);

// // Mock flight data
// const mockFlights = [
//   { id: 1, name: 'Flight A', status: 'On Time' },
//   { id: 2, name: 'Flight B', status: 'Delayed' }
// ];

// // API to get flights
// app.get('/', (req, res) => {
//   console.log("hello!!");
//   res.send("Hello, World!");
// });
// app.get('/api/flights', (req, res) => {
//   res.json(mockFlights);
// });

// // API to subscribe to flight notifications
// app.post('/api/subscribe/:id', (req, res) => {
//   const { id } = req.params;
//   // Implement notification logic here
//   res.send(`Subscribed to flight ${id}`);
// });

// // Start the server
// app.listen(PORT , () => {
//   console.log(`Server is running port on http://localhost/${PORT}`)
// })
