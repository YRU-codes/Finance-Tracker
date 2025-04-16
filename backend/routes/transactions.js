const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");

// Get all transactions
router.get("/", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// Add a transaction
router.post("/", async (req, res) => {
  try {
    const txn = new Transaction(req.body);
    await txn.save();
    res.status(201).json(txn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  try {
    const txn = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(txn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
