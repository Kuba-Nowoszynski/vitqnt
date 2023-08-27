const User = require("../models/User");

// Helper function to handle user verification expiry
exports.handleStaleUser = async (verifyToken) => {
  // If the user doesn't verify within x minutes, delete the account
  console.log("Running stale check...");
  const staleUser = await User.findOne({ verifyToken });
  console.log("Stale user:", staleUser);
  if (staleUser && !staleUser.isVerified) {
    console.log("Deleting stale user...");
    await User.deleteOne({ _id: staleUser._id });
    console.log("Deleted.");
  } else {
    console.log("No stale user found or user already verified.");
  }
};
