const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { httpStatus, httpStatusName } = require("../constants/http.constants");
const dotenv = require("dotenv");
dotenv.config();

/**
 * This method runs before any route which is protected and it validates the jwt token
 * which needs to be passed with authorization key in request header
 * Once token is validated it also adds the email id and name of authenticated user in request object
 */
module.exports = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const jwtToken = authHeader.split(" ")[1];
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const { email, name } = decoded;
      req.email = email;
      req.name = name;
      next();
    } catch (error) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: httpStatusName.UNAUTHORIZED,
        error: {
          field: "token",
          description: error.message,
        },
      });
    }
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: httpStatusName.UNAUTHORIZED,
      error: {
        description: "Please provide the valid bearer token",
      },
    });
  }
});
