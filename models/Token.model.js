const mongoose = require("mongoose");
const reference = require("../constants/reference.constants");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: reference.VERIFICATION_TOKEN_EXPIRATION,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tokens", tokenSchema);
