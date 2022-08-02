const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
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
      const { id, email, name } = decoded;
      req.id = id;
      req.email = email;
      req.name = name;
      next();
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: {
          field: "token",
          description: error.message,
        },
      });
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      error: {
        description: "Please provide a valid bearer token in request header",
      },
    });
  }
});
