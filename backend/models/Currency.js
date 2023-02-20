const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["fast", "limited", "nostock", "null"],
    required: true,
  },
  code: String,
  cname: String,
  update: Date,
});

module.exports = mongoose.model("Currency", currencySchema);
