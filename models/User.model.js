const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Token = require("./Token.model");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true, "Email is already taken"],
    },
    mobileNo: String,
    password: {
      type: String,
      required: [true, "Please provide a valid password"],
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    colorOption: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoggedIn: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
