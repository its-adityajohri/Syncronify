const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
// const webRoutes = require('./routes/web'); // Uncomment and adjust the path as necessary
const authRoutes = require('./routes/authMain.js');
const errorHandler = require('./middleware/errorHandler.js');



const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("./services/mailerService.js");
const crypto = require("crypto");
const filterObj = require("./utils/filterObj.js");

// Model
const { GeneralUser, AdminUser, ApplicationAdminUser } = require("./models/userModel.js");
const otp = require("./templates/mail/otp.js");
const resetPasswordMail = require("./templates/mail/resetPasswordMail.js");
const catchAsync = require("./utils/catchAsync.js");

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';


const signToken = (userId, userType) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // Token expires in one day
  );
};



dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use('/health', (req, res) => res.status(200).send({ message: 'Synchronify Http and Tcp-socket servers are running' }));
// app.use('/api', webRoutes); // Uncomment when webRoutes are converted to CommonJS
app.use('/api/auth', authRoutes);
app.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;
  const user = await GeneralUser.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "Email is already verified",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });

    return;
  }

  // OTP is correct

  user.verified = true;
  user.otp = undefined;
  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified Successfully!",
    token,
    user_id: user._id,
  });
})
app.use(errorHandler);

module.exports = app;


// import dotenv from 'dotenv';
// import cors from 'cors';
// import express from 'express';
// // import webRoutes from './routes/web';
// import authRoutes from './routes/authMain.js';
// import errorHandler from './middleware/errorHandler.js';

// dotenv.config();
// const app = express();
// app.use(cors());

// app.use(express.json());

// app.use('/health', (req, res) => res.status(200).send({message : 'Synchronify Http and Tcp-socket servers are running'}))
// app.use('/api', webRoutes);
// app.use('./api/auth', authRoutes);
// app.use(errorHandler);


// export default appMain;