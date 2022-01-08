const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'user name is required'],
  },
  email: {
    type: String,
    required: [true, 'email name is required'],
  },
  password: {
    type: String,
    required: [true, 'password name is required'],
  },
  date: {
    type: Number,
    default: Date.now(),
  },
  address: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
