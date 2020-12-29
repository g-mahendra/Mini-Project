const mongoose = require("mongoose");

const CanteenSchema = mongoose.Schema({
  name: String,
  information: String,
  openingTime: String,
  closingTime: String,
  location: String,
  menu: [{
    dish: String,
    price: String
  }],
  reviews: [{
    authourName: String,
    reviewTitle: String,
    reviewBody: String,
    rating: String
  }]
});

const Canteen = mongoose.model("canteen", CanteenSchema);

module.exports = Canteen;
