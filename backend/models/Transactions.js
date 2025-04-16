const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: String,
  category: {
    type: String,
    default: "Uncategorized",
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);