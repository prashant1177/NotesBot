// utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
