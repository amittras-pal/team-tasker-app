const User = require("../models/User.model");
const {
  httpStatus: http,
  httpStatusName,
} = require("../constants/http.constants");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Token = require("../models/Token.model");
const { validateCreatePayload } = require("../utils/requestValidators");
const { sendEmail } = require("../utils/mailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * This method will be used to generate and send token in email to user
 * @param {String} name It takes name of user to include in email
 * @param {String} emailId Email id of user to send email
 * @param {String} template Which email template to be used
 * @param {String} subject Subject of the email
 */
const sendEmailVerificationToken = async (name, emailId, template, subject) => {
  try {
    const generatedToken = await Token.create({
      emailId,
      token: crypto.randomBytes(3).toString("hex"),
    });
    await sendEmail({
      to: emailId,
      subject,
      template,
      context: { name, code: generatedToken.token },
    });
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @POST /api/user/register
 * Authentication: Unprotected and can be invoked without login
 * This method will create a user in the system
 */
const signUp = asyncHandler(async (req, res) => {
  const { name, email, mobileNo, password } = req.body;
  const { valid, description, field } = validateCreatePayload(req.body);
  if (!valid)
    return res.status(http.BAD_REQUEST).json({
      message: httpStatusName.BAD_REQUEST,
      error: {
        field,
        description,
      },
    });

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    return res.status(http.CONFLICT).json({
      message: httpStatusName.CONFLICT,
      error: {
        field: "email",
        description: "Email is assocaited with some account",
      },
    });
  }

  const user = await User.create({
    name,
    email,
    mobileNo,
    password,
  });

  if (user) {
    sendEmailVerificationToken(
      user.name,
      user.email,
      "verifyRegistration",
      "New Account Verification"
    );
    return res.status(http.CREATED).json({
      message: httpStatusName.CREATED,
      response: {
        _id: user.id,
        name: user.name,
        email: user.email,
        description: "User created successfully",
      },
    });
  } else {
    throw new Error("Something went wrong while processing request");
  }
});

/**
 * @Get /api/user/verify-token
 * Authentication: Unprotected and can be invoked without login
 * This end point is used for verifying user email and activating user account
 */
const verifyEmail = asyncHandler(async (req, res) => {
  const { emailId, token } = req.query;
  if (!emailId || !token)
    return res.status(http.BAD_REQUEST).json({
      message: httpStatusName.BAD_REQUEST,
      error: {
        field: "",
        description: "Please pass the mandatory parameteres",
      },
    });

  const existingToken = await Token.findOne({ emailId, token });
  if (existingToken) {
    await User.updateOne(
      { email: emailId },
      { $set: { isEmailVerified: true } }
    );
    existingToken.delete();
    return res.json({
      message: httpStatusName.OK,
      response: {
        description: "Email verified successfully",
      },
    });
  } else {
    return res.status(http.NOT_FOUND).json({
      message: httpStatusName.NOT_FOUND,
      error: {
        field: "",
        description: "Verifaction code has expired",
      },
    });
  }
});

/**
 * @GET /api/user/search-email?emailId="some_email"
 * Query parameters: @param {String} emailId It is a required query parameter
 * Authentication: Protected and user needs to provide bearer token with key authorization in request header
 * This method is used to search if email id is already taken or not
 */

const searchUserByEmail = asyncHandler(async (req, res) => {
  const { emailId } = req.query || {};
  if (!emailId) {
    return res.status(http.BAD_REQUEST).json({
      message: httpStatusName.BAD_REQUEST,
      error: {
        field: "email",
        description: "Please provide email id",
      },
    });
  }
  await User.exists({ email: emailId }, function (err, doc) {
    if (err) {
      throw err;
    }
    res.json({
      message: httpStatusName.OK,
      response: {
        exists: !!doc,
        description: doc
          ? "Email id is not available"
          : "Email id is available",
      },
    });
  });
});

/**
 * @GET /api/user/search?name='some_string'
 * Authentication: Protected and user needs to provide bearer token with key authorization in request header
 * This method searches the users whose name contains the search string passed as name
 * Result is sorted by createdDate desc
 */
const searchUserByName = asyncHandler(async (req, res) => {
  const { name } = req.query;
  if (!name)
    return res.status(http.BAD_REQUEST).json({
      message: httpStatusName.BAD_REQUEST,
      error: {
        field: "name",
        description: "Please provide name to search users",
      },
    });

  const users = await User.find(
    {
      name: { $regex: name.trim(), $options: "i" },
      isEmailVerified: true,
    },
    { _id: 1, name: 1, email: 1 }
  ).sort({ name: "asc" });
  return res.json({
    message: httpStatusName.OK,
    response: {
      users,
    },
  });
});

/**
 * This method is used in login process to generate the JWT token
 * @param {String} id Object id of the user document
 * @param {String} email Email id of the user to put in token
 * @param {String} name name of user to put in token
 * @returns JWT Token
 */
const generateJWTToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

/**
 * @POST /api/user/login
 * Authentication: Unprotected and can be invoked by any user
 * This method is used for user login it validates email id
 * and password and once it is valid issues an jwt token
 * which can be used in subsequnent requests
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(http.BAD_REQUEST).json({
      message: httpStatusName.BAD_REQUEST,
      error: { description: "Please provide email id and password" },
    });

  // Load user from DB
  const userInDB = await User.findOne({ email });
  if (!userInDB)
    return res.status(http.UNAUTHORIZED).json({
      message: httpStatusName.UNAUTHORIZED,
      response: {
        field: "email",
        description: "Email id is incorrect",
      },
    });
  if (!userInDB.isActive)
    return res.status(http.UNAUTHORIZED).json({
      message: httpStatusName.UNAUTHORIZED,
      response: {
        field: "email",
        description: "User account is inactive",
      },
    });

  const result = await bcrypt.compare(password, userInDB.password);
  if (!result)
    return res.status(http.UNAUTHORIZED).json({
      message: httpStatusName.UNAUTHORIZED,
      error: {
        field: "password",
        description: "Password is incorrect",
      },
    });
  const token = generateJWTToken(userInDB.id, userInDB.email, userInDB.name);
  return res.json({
    message: httpStatusName.OK,
    response: {
      token,
      description: "Login successful",
    },
  });
});

module.exports = {
  signUp,
  verifyEmail,
  searchUserByEmail,
  searchUserByName,
  login,
};
