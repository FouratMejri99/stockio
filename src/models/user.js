const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stocks: [
    {
      symbol: String,
      open: Number,
      high: Number,
      low: Number,
      close: Number,
      volume: Number,
      afterHours: Number,
      preMarket: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
