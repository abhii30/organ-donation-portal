const mongoose = require("mongoose");
const detailSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  city: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  state: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  pincode: {
    type: String,
    required: true,
    min: 6,
  },
  bloodGroup: {
    type: String,
    required: true,
    min: 2,
    max: 4,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    min: 6,
    max: 100,
  },
  contactNumber: {
    type: String,
    required: true,
    length: 10,
  },
});

module.exports = mongoose.model("Detail", detailSchema);
