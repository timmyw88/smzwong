require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const Currency = require("./models/Currency");
const AllCurrencies = require("./models/AllCurrencies");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB);

const currencies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/currency.json`, "utf-8")
);

const importData = async () => {
  try {
    await Currency.create(currencies);
    console.log("Data imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const allCurrencies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/currencies.json`, "utf-8")
);

const importCurrencies = async () => {
  try {
    await AllCurrencies.create(allCurrencies);
    console.log("Currencies imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Currency.deleteMany();
    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else if (process.argv[2] === "-c") {
  importCurrencies();
}
