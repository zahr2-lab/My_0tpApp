const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  name: { type: String },
  number: { type: String, require: true },
  otp: { type: String, require: true },
  date: { type: Date, default: Date.now },
  otptimes: { type: Number, max: 3 }
});

module.exports = mongoose.model("OTP", otpSchema);
