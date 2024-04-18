const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userType: {
    type: String,
    enum: ['genUser', 'adminUser', 'applicationAdminUser'],
    required: true,
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
  },
  attendingEvents: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: props => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otp_expiry_time: {
    type: Date,
  },
  socket_id: {
    type: String
  },
  status: {
    type: String,
    enum: ["Online", "Offline"]
  }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("otp") || !this.otp) return next();
  this.otp = await bcrypt.hash(this.otp.toString(), 12);
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async function(candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
const GeneralUser = User.discriminator('GeneralUser', new mongoose.Schema({}));
const AdminUser = User.discriminator('AdminUser', new mongoose.Schema({
  isApproved: { type: Boolean },
  isCommunityAdmin: { type: Boolean },
  communityName: { type: String },
  organizationName: { type: String },
  postedEvents: [{ type: mongoose.Types.ObjectId, ref: 'Event' }]
}));
const ApplicationAdminUser = User.discriminator('ApplicationAdminUser', new mongoose.Schema({}));

module.exports = { User, GeneralUser, AdminUser, ApplicationAdminUser };
