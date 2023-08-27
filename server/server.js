const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = ["https://vitqnt.netlify.app", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing JSON

// Connect to MongoDB
const db = process.env.MONGODB_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use("/api", authRouter);
app.get("/", (req, res) => res.send("Server is running on port " + PORT));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
