// utils/generateOtp.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateOtpToken = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '10m' }); // expires in 10 min
  return { otp, token };
};

const verifyOtpToken = (token, otpInput) => {
  try {// utils/generateOtp.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateOtpToken = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '10m' }); // expires in 10 min
  return { otp, token };
};

const verifyOtpToken = (token, otpInput) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.otp === otpInput;
  } catch (err) {
    return false;
  }
};

module.exports = { generateOtpToken, verifyOtpToken };

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.otp === otpInput;
  } catch (err) {
    return false;
  }
};

module.exports = { generateOtpToken, verifyOtpToken };
