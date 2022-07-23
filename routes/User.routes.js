const router = require("express").Router();
const {
  signUp,
  verifyRegistrationToken,
} = require("../controllers/user.controller");

router.post("/signup", signUp);
router.get("/verify-token/:userId/:token", verifyRegistrationToken);

module.exports = router;
