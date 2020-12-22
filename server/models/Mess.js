const mongoose = require("mongoose");

const MessSchema = mongoose.Schema({
  name: String,
  information: String,
  openingTime: String,
  closingTime: String,
  pricePerMonth: String,
  location: String,
  timetable: [{
    day: String,
    breakfast: String,
    lunch: String,
    dinner: String
  }],
  reviews: [{
    authourName: String,
    reviewTitle: String,
    reviewBody: String,
    rating: String
  }]
});

const Mess = mongoose.model("mess", MessSchema);

module.exports = Mess;
