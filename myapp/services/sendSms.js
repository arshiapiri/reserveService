//send sms  
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);


module.exports.sendSMS = async (phoneNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: "YOUR_TWILIO_PHONE_NUMBER",
      to: phoneNumber
    });

    console.log('Message sent successfully:', response.sid);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};