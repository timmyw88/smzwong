const mongoose = require("mongoose");

const allCurrenciesSchema = new mongoose.Schema({
  code: String,
  cname: String,
});

module.exports = mongoose.model("AllCurrencies", allCurrenciesSchema);
