const mongoose = require("mongoose");

const vitaminNames = [
  "Vitamin C",
  "Vitamin B1",
  "Vitamin B2",
  "Vitamin B3",
  "Vitamin B5",
  "Vitamin B6",
  "Vitamin B7",
  "Vitamin B9",
  "Vitamin B12",
  "Vitamin A",
  "Vitamin D",
  "Vitamin E",
  "Vitamin K",
];

const vitaminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: vitaminNames,
  },
  amount: {
    type: Number,
    default: null,
  },
});

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
  vitaminIntake: [vitaminSchema], // Change to array of objects
});

// Pre-save hook to initialize vitaminIntake with null values if not set
userSchema.pre("save", function (next) {
  const vitaminIntakeNames = this.vitaminIntake.map((vitamin) => vitamin.name);
  vitaminNames.forEach((vitaminName) => {
    if (!vitaminIntakeNames.includes(vitaminName)) {
      this.vitaminIntake.push({ name: vitaminName, amount: null });
    }
  });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
