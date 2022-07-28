const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");

const {
  signUp,
  verifyEmail,
  searchUserByEmail,
  searchUserByName,
  login,
} = require("../controllers/user.controller");

router.post("/register", signUp);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.get("/search-email", searchUserByEmail);
router.get("/search", searchUserByName);

module.exports = router;
