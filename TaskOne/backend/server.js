const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDb();

const app = express();

app.use(express.json);
app.use(cors());

app.use("/api/auth",authRoutes);

PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is running...")
});