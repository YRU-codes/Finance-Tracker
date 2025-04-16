const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const transactionRoutes = require("./routes/transactions");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes (we’ll create them soon)

app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Personal Finance API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});