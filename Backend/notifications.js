const admin = require('firebase-admin');

function sendNotification(token, message) {
  const payload = {
    notification: {
      title: 'Flight Status Update',
      body: message,
    },
  };

  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
}

module.exports = { sendNotification };
