require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to DB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB);

// Import Models
const Currency = require("./models/Currency");
const AllCurrencies = require("./models/AllCurrencies");

const app = express();

app.use(express.json());
app.use(cors());

// Getting all currencies
app.get("/currency", async (req, res) => {
  const currencies = await Currency.find({}).sort({ category: 1, code: 1 });
  res.status(200).json(currencies);
});

app.get("/currency/:category", async (req, res) => {
  const currencies = await Currency.find({
    category: req.params.category,
  }).sort("code");
  if (!currencies) {
    return res.status(404).json({ msg: "Category not found!" });
  }
  res.status(200).json(currencies);
});

// Create currency
// app.post("/currency", async (req, res) => {
//   const currency = await Currency.create({
//     category: req.body.category,
//     code: req.body.code,
//     update: Date.now(),
//   });
//   res.status(200).json(currency);
// });

// Update single currency
app.put("/currency/:id/update", async (req, res) => {
  try {
    const currency = await Currency.findById(req.params.id);
    if (!currency) {
      return res.status(404).json({ msg: "Currency not found" });
    }

    let checkCurrency;

    if (req.body.code.trim() !== "") {
      checkCurrency = await AllCurrencies.findOne({
        code: req.body.code.trim(),
      });
      if (!checkCurrency) {
        return res
          .status(400)
          .json({ msg: `${req.body.code.trim()} is not recognized!` });
      }
    }

    const updData = {
      code: req.body.category === "null" ? "" : req.body.code.trim(),
      cname: req.body.code.trim() === "" ? "" : checkCurrency.cname,
      category: req.body.code.trim() === "" ? "null" : req.body.category,
      update: Date.now(),
    };
    const updatedCurrency = await Currency.findByIdAndUpdate(
      req.params.id,
      updData,
      { new: true }
    );
    res.status(200).json(updatedCurrency);
  } catch (err) {
    return res.status(400).json({ msg: "Invalid Currency Input!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Backend is running..."));
