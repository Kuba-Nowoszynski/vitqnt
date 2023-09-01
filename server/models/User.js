const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [String],
  isVerified: { type: Boolean, default: false },
  verifyToken: String,
  verifyTokenExpires: Date,
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
    default: "male",
  },
  age: {
    type: Number,
    min: 0,
    max: 90,
    required: true,
    default: 0,
  },
  vitaminIntake: [
    {
      name: String,
      amount: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
