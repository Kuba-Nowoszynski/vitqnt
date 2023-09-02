const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("Server is running");
});
router.post("/signup", authController.signup);
router.get("/verify-email", authController.verifyEmail);
router.post("/signin", authController.signin);
router.get("/getuser", authenticate, authController.getUser);
router.post("/signout", authController.signout);
router.put("/updateprofile", authenticate, authController.updateProfile);

module.exports = router;
