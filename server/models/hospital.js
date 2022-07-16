const { string, date } = require("joi");
const mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  patientfirstName: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  patientlastName: {
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
  organ: {
    type: String,
    required: true,
    min: 0,
    max: 100,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    min: 6,
    max: 100,
  },
  patientcontactNumber: {
    type: String,
    required: true,
    length: 10,
  },
  hospitalcontactNumber: {
    type: String,
    required: true,
    length: 10,
  },
  date: {
    type: Date,
    default:Date.now,
  }
});

module.exports = mongoose.model("hospitalDetail", hospitalSchema);
