const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../User');
const Flight = require('../Flight');
const { sendEmail, sendSMS } = require('../config/notifications');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const checkFlightStatus = async () => {
  const flights = await Flight.find({});
  
  for (const flight of flights) {
    try {
      // Replace this with the actual API endpoint for checking flight status
      const response = await axios.get(`https://api.flightstatus.com/flight/${flight.flightNumber}`);
      const newStatus = response.data.status;
      
      
      if (newStatus !== flight.status) {
        flight.status = newStatus;
        flight.lastChecked = new Date();
        await flight.save();
        
        const users = await User.find({ flightNumber: flight.flightNumber });
        
        for (const user of users) {
          const message = `Flight ${flight.flightNumber} status changed to ${newStatus}`;
          await sendEmail(user.email, 'Flight Status Update', message);
          await sendSMS(user.phoneNumber, message);
        }
      }
    } catch (error) {
      console.error(`Error checking status for flight ${flight.flightNumber}:`, error);
    }
  }
};

checkFlightStatus().then(() => {
  mongoose.connection.close();
  console.log('Flight status check completed');
}).catch(error => {
  console.error('Error checking flight statuses:', error);
  mongoose.connection.close();
});
