import mongoose, { Document, Model, Types } from 'mongoose';
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface IUserDocument extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  userType: 'genUser' | 'adminuser' | 'applicationAdminUser';
  about?: string;
  avatar?: string;
  attendingEvents: Types.ObjectId[];
  email: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  verified?: boolean;
  otp?: string;
  otp_expiry_time?: Date;
  socket_id?: string;
  status: 'Online' | 'Offline';

  // Method declarations
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  correctOTP(candidateOTP: string, userOTP: string): Promise<boolean>;
  changedPasswordAfter(JWTTimeStamp: number): boolean;
  createPasswordResetToken(): string;
}

interface IGeneralUserDocument extends IUserDocument {}
interface IAdminUserDocument extends IUserDocument {
  isApproved: boolean;
  isCommunityAdmin: boolean;
  communityName: string;
  organizationName: string;
  postedEvents: Types.ObjectId[];
}
interface IApplicationAdminUserDocument extends IUserDocument {}


interface IUserModel extends Model<IUserDocument> {};
interface IGeneralUserModel extends Model<IGeneralUserDocument> {}
interface IAdminUserModel extends Model<IAdminUserDocument> {}
interface IApplicationAdminUserModel extends Model<IApplicationAdminUserDocument> {}

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
  attendingEvents: [{ type: Types.ObjectId, ref: 'Event' }],
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email: any) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props: { value: any; }) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    // unselect
    type: String,
    required : true,
  },
  passwordChangedAt: {
    // unselect
    type: Date,
  },
  passwordResetToken: {
    // unselect
    type: String,
  },
  passwordResetExpires: {
    // unselect
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    // unselect
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

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("otp") || !this.otp) return next();

  // Hash the otp with cost of 12
  this.otp = await bcrypt.hash(this.otp.toString(), 12);

  console.log(this.otp.toString(), "FROM PRE SAVE HOOK");

  next();
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password") || !this.password) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();

    this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async function (candidateOTP: string, userOTP: string) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp: any) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


// genUserSchema.methods.changedPasswordAfter = function (JWTTimeStamp: any) {
//   if (this.passwordChangedAt) {
//     const changedTimeStamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
//     return JWTTimeStamp < changedTimeStamp;
//   }

//   // FALSE MEANS NOT CHANGED
//   return false;
// };

const genUserSchema = new mongoose.Schema({});
const adminUserSchema = new mongoose.Schema({
  isApproved: { type: Boolean},
  isCommunityAdmin: { type: Boolean },
  communityName: { type: String },
  organizationName: { type: String },
  postedEvents: [{ type: Types.ObjectId, ref: 'Event' }]
});
const applicationAdminUserSchema = new mongoose.Schema({});

const User: IUserModel = mongoose.model<IUserDocument>('User', userSchema);
const GeneralUser : IGeneralUserModel = User.discriminator<IGeneralUserDocument>('GeneralUser', genUserSchema);
const AdminUser : IAdminUserModel = User.discriminator<IAdminUserDocument>('AdminUser', adminUserSchema);
const ApplicationAdminUser : IApplicationAdminUserModel = User.discriminator<IApplicationAdminUserDocument>('ApplicationAdminUser', applicationAdminUserSchema);

export default User;
export { GeneralUser, AdminUser, ApplicationAdminUser };


// schema.pre('save', async function (next) {
//     try {
//         if (!this.isModified('password')) {
//             return next();
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//         return next();
//     } catch (error: any) {
//         return next(error);
//     }
// });


// schema.pre('findOneAndUpdate', async function (next) {
//     try {
//         const password = (this.getUpdate() as { $set: any })['$set'].password;
//         if (!password) {
//             return next();
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         (this.getUpdate() as { $set: any })['$set'].password = hashedPassword;
//         return next();
//     } catch (error: any) {
//         return next(error);
//     }
// });



// const UserModel = mongoose.model('User', schema);

// export default UserModel;
