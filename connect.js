const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // To allow cross-origin requests

// MongoDB connection URI
const uri =
  "mongodb+srv://sirat:fsm456123@cluster0.wwmew.mongodb.net/stockprice?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stocks: [{ type: Object }],
});

const User = mongoose.model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

// Add stock to user's stock list
app.post("/add-stock", async (req, res) => {
  const { email, stockData } = req.body;

  if (!email || !stockData) {
    return res
      .status(400)
      .json({ message: "Email and stock data are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure stocks array exists before pushing
    if (!user.stocks) {
      user.stocks = [];
    }

    user.stocks.push(stockData);
    await user.save();

    res
      .status(200)
      .json({ message: "Stock added successfully!", stocks: user.stocks });
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
