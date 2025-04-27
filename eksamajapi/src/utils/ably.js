// src/utils/ably.js
const Ably = require('ably');


const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
const sendNotification = async (channelName, eventName, data) => {
  console.log("Notification request", channelName, " Eventname", eventName, " DAta",data)
  try {
    await ably.channels.get(channelName).publish(eventName, data);
  } catch (err) {
    console.error('Ably error:', err);
  }
};

module.exports = {
  sendNotification,
};
