const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");

dotenv.config();
connectDb();

const app = express();

app.use(express.json());

// ✅ Updated CORS Configuration with Full Protocol
app.use(cors({
    origin: ["https://taskone2.netlify.app"],   // ✅ Use full URL with protocol
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware for JWT Authentication
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ✅ Authentication Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Protected Home Route (No Controller Required)
app.get("/api/home", authMiddleware, (req, res) => {
    res.json({ message: "Hello, Welcome" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
