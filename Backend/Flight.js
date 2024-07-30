const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  status: String,
  lastChecked: Date,
});

module.exports = mongoose.model('Flight', FlightSchema);
