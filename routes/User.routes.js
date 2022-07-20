const router = require("express").Router();
const { signUp, verifyToken } = require("../controllers/User.controller");

router.post("/signup", signUp);
router.get("/verify-token/:userId/:token", verifyToken);

module.exports = router;
