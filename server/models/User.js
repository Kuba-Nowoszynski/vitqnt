const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tokens: [String],
  isVerified: { type: Boolean, default: false },
  verifyToken: String,
  verifyTokenExpires: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
