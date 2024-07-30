const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    flightNumber: String,
  });
  
  module.exports = mongoose.model('User', UserSchema);