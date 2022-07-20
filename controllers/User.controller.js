const User = require("../models/User.model");
const http = require("../constants/http.constants");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Token = require("../models/Token.model");
const { validateCreatePayload } = require("../utils/authentication");

/**
 * This method is used to register user in the application
 */
const signUp = asyncHandler(async (req, res) => {
  const { name, email, mobileNo, password } = req.body;
  const { valid, description } = validateCreatePayload(req.body);
  if (!valid) {
    res.status(http.BAD_REQUEST);
    throw new Error(description);
  }
  // Check if email id is already registered
  const searchUser = await User.findOne({ email });
  if (searchUser) {
    res.status(http.CONFLICT);
    throw new Error(
      `Email Id: ${email} is already associated with some account`
    );
  }
  // register user
  const hashSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, hashSalt);
  const user = await User.create({
    name,
    email,
    mobileNo,
    password: hashedPassword,
  });
  // Generate a token for user
  const generatedToken = await Token.create({
    userId: user.id,
    token: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
  });
  console.log("Token:", generatedToken.token);

  if (user) {
    res.status(http.CREATED).json({
      message: "User created successfully and verification email sent",
      response: {
        _id: user.id,
        name: user.name,
        mobileNo: user.mobileNo,
        email: user.email,
      },
    });
  } else {
    res.status(http.INTERNAL_SERVER_ERROR);
    throw new Error("Something went wrong while processing request");
  }
});

//const login = asyncHandler(async (req, res) => {});

/**
 * @Get /api/user/verify-token/:userId/:token
 * This end point is used for verifying user email and activating user account
 */
const verifyToken = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;
  const exitingToken = await Token.findOne({ userId, token });
  if (exitingToken) {
    const user = await User.updateOne(
      { _id: userId },
      { $set: { isActive: true, isEmailVerified: true } }
    );
    if (user) {
      res.status(http.OK).json({ message: "Verification is successfull" });
    } else {
      res.status(http.INTERNAL_SERVER_ERROR).json("Some error occured");
      throw new Error("Unabel to verify user");
    }
  } else {
    res.status(http.NOT_FOUND).json({
      message: "Verification code has expired please generate a new one",
    });
    throw new Error("Verification token has expired");
  }
});

module.exports = {
  signUp,
  verifyToken,
};
