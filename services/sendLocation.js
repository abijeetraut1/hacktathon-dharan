require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);
const User = require("../model/userModel");

exports.getLocationFromDb = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  const location = user.location;
  const phone = user.phone || req.body.phone;
  const success = await twilio.messages.create({
    body: `Hello , I am  here at : ${location}`,
    from: process.env.FROM_NUMBER,
    to: phone,
  });
  if (success) return res.json({ status: "200", message: "sent sucessfully" });
};
