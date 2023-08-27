const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashUtils");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  verifyEmailTransporter,
} = require("../helpers/emailHelper");
const { handleStaleUser } = require("../helpers/staleUserHelper");

exports.signup = async (req, res) => {
  try {
    // Email verification
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpires = new Date();
    verifyTokenExpires.setMinutes(verifyTokenExpires.getMinutes() + 15); // Token expires in 15 minutes

    // Validation and hashing logic here
    const hashedPassword = await hashPassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpires,
    });
    await user.save();

    // Handle stale users
    setTimeout(() => handleStaleUser(verifyToken), 15 * 60 * 1000); // 15 minutes in milliseconds
    // Handle email verification
    verifyEmailTransporter(); // use helper function
    sendVerificationEmail(user, verifyToken); // use helper function

    res.json({ user });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token: emailToken } = req.query;
    const user = await User.findOne({
      verifyToken: emailToken,
      verifyTokenExpires: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expires in 30 days
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
    // Send response
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isValidPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expires in 30 days
    });

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    // Send response
    res.json({ message: "Successfully signed in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    // same domain and path as you set when creating the cookie
    domain: "localhost",
    path: "/",
  });
  // Send response
  res.json({ message: "Logged out" });
};
