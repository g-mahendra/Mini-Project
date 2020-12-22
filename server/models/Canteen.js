const mongoose = require("mongoose");

const CanteenSchema = mongoose.Schema({
  name: String,
  information: String,
  openingTime: String,
  closingTime: String,
  location: String,
  menu: [{
    no: String,
    dish: String,
    price: String
  }]
});

const Canteen = mongoose.model("canteen", CanteenSchema);

module.exports = Canteen;
