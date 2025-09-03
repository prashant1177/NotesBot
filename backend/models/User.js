const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  userabout: { type: String },
  project: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      }
    ],
    default: [],
  },
  password: { type: String, required: true },

  isVerified: { type: Boolean, default: false },

  // Premium subscription fields for single plan
  isPremium: { type: Boolean, default: false }, // whether user has premium access
  subscriptionId: { type: String, default: null }, // Razorpay subscription IDs
  premiumExpiry: { type: Date, default: null }, // when premium expires
});

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 14);
  next();
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
