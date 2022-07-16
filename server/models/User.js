const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  confirmPassword: {
    type: String,
    required: true,
    required: true,
    min: 8,
    max: 20,
  },
});

module.exports = mongoose.model("User", userSchema);
