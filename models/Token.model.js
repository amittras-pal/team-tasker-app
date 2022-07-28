const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 1800,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tokens", tokenSchema);
