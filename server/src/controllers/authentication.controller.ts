import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import sendEmail from "../services/mailer";
import crypto from "crypto";

import filterObj from "../utils/filterObj";

// Model
import User from "../models/user.model";
import { GeneralUser, AdminUser, ApplicationAdminUser } from "../models/user.model";
import otp from "../templates/mail/otp";
import resetPassword from "../templates/mail/resetPassword";
// import { promisify } from "util";
import catchAsync from "../utils/catchAsync";

// this function will return you jwt token
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const signToken = (userId : number) => jwt.sign({ userId }, JWT_SECRET);

// Register New User



exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  );

  // check if a verified user with given email exists

  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    // user with this email already exists, Please login
    return res.status(400).json({
      status: "error",
      message: "Email already in use, Please login.",
    });
  } else if (existing_user) {
    // if not verified than update prev one

    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    });

    // generate an otp and send to email
    req.userId = existing_user._id;
    next();
  } else {
    // if user is not created before than create a new one
    const new_user = await User.create(filteredBody);

    // generate an otp and send to email
    req.userId = new_user._id;
    next();
  }
});

exports.sendOTP = catchAsync(async (req, res, next) => {
    const { userId } = req;
    const new_otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
    });
  
    const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent
  
    const user = await User.findByIdAndUpdate(userId, {
      otp_expiry_time: otp_expiry_time,
    }, { new: true }); // Ensure that the updated document is returned
  
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
  
    user.otp = new_otp.toString();
  
    await user.save({ validateModifiedOnly: true });
  
    console.log(new_otp);
  
    sendEmail({
      from: "yourEmail@example.com", 
      to: user.email,
      subject: "Verification OTP",
      html: otp(user.firstName, new_otp), 
      attachments: [],
    });
  
    res.status(200).json({
      status: "success",
      message: "OTP Sent Successfully!",
    });
});
  

exports.verifyOTP = catchAsync(async (req, res, next) => {
  // verify otp and update user accordingly
  const { email, otp } = req.body;
  const user = await User.findOne({
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

    if (!(await user.correctOTP(otp, user.otp || ""))) {
        res.status(400).json({
            status: "error",
            message: "OTP is incorrect",
        });

        return;
    }

    // OTP is correct

    user.verified = true;
    user.otp = undefined;
    await user.save({ validateModifiedOnly: true });

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        message: "OTP verified Successfully!",
        token,
        user_id: user._id,
    });

});    

// User Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Both email and password are required",
    });
    return;
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !user.password) {
    res.status(400).json({
      status: "error",
      message: "Incorrect password",
    });

    return;
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "Email or password is incorrect",
    });

    return;
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully!",
    token,
    user_id: user._id,
  });
});

// Protect
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
      return res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
      });
  }
  // 2) Verification of token
  let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Assuming JWT_SECRET is defined in your environment variables
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token. Please log in again.",
      });
    }

  console.log(decoded);

  // 3) Check if user still exists

  const this_user = await User.findById(decoded.userId);
    if (!this_user) {
      return res.status(401).json({
        message: "The user belonging to this token does no longer exists.",
      });
    }
    // 4) Check if user changed password after the token was issued
    if (this_user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        message: "User recently changed password! Please log in again.",
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = this_user;
    next();
});

exports.protectGeneralUser = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }

  if (!token) {
      return res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
      });
  }

  let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Assuming JWT_SECRET is defined in your environment variables
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token. Please log in again.",
      });
    }

  console.log(decoded);
  const currentUser = await GeneralUser.findById(decoded.userId);

  if (!currentUser) {
      return res.status(401).json({
          message: "The user belonging to this token no longer exists.",
      });
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
          message: "User recently changed password! Please log in again.",
      });
  }

  req.user = currentUser;
  next();
});


exports.protectAdminUser = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }

  if (!token) {
      return res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
      });
  }

  let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Assuming JWT_SECRET is defined in your environment variables
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token. Please log in again.",
      });
    }

  console.log(decoded);
  const currentUser = await AdminUser.findById(decoded.userId);

  if (!currentUser) {
      return res.status(401).json({
          message: "The user belonging to this token no longer exists.",
      });
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
          message: "User recently changed password! Please log in again.",
      });
  }

  req.user = currentUser;
  next();
});


exports.protectApplicationAdminUser = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }

  if (!token) {
      return res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
      });
  }

  let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Assuming JWT_SECRET is defined in your environment variables
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token. Please log in again.",
      });
    }

  console.log(decoded);
  const currentUser = await ApplicationAdminUser.findById(decoded.userId);

  if (!currentUser) {
      return res.status(401).json({
          message: "The user belonging to this token no longer exists.",
      });
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
          message: "User recently changed password! Please log in again.",
      });
  }

  req.user = currentUser;
  next();
});


exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "There is no user with email address.",
    });
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;
    // TODO => Send Email with this Reset URL to user's email address

    console.log(resetURL);

    sendEmail({
      from: "adityajohri2015@gmail.com",
      to: user.email,
      subject: "Reset Password",
      html: resetPassword(user.firstName, resetURL),
      attachments: [],
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "There was an error sending the email. Try again later!",
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Token is Invalid or Expired",
    });
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reseted Successfully",
    token,
  });
});


