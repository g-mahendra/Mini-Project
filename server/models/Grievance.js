const mongoose = require("mongoose");

const GrievanceSchema = mongoose.Schema({
  title: String,
  name: String,
  body: String,
  url: String
});

const Grievance = mongoose.model("grievance", GrievanceSchema);

module.exports = Grievance;
