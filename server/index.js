const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({
  origin: 'https://velvety-five.vercel.app', // http://localhost:5173 thay cái này nào khi anh em làm để thấy kết quả trực tiếp trên local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // làm xong local để lại https://velvety-five.vercel.app này rồi mới commit
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Import Routes
const routes = require('./routes'); // Import the routes

// Use routes with /api prefix
app.use('/api', routes);  // All API routes will now be prefixed with /api

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
