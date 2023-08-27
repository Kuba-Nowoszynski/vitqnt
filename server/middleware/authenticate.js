const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;
  // If no token is provided, return an unauthorized error
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token using the secret key and decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId; // Store the decoded user ID in the request
    next();
  } catch (error) {
    // If the token is invalid or expired, log the error and return an unauthorized error
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
