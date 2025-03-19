const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Register User with Hashed Password
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Register controller called");

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user with hashed password
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, user: { id: user.id, email, username } });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send("Server error");
  }
};

// ✅ Login User with Password Comparison
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login controller called");

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, email, username: user.username } });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { register, login };
