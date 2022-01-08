const mongoose = require("mongoose");

var tokenSchema = new mongoose.Schema({
  tokenid: {
    type: String,
    required: [true, 'tokenid is required'],
  },
  price: {
    type: String,
    required: [true, 'price off is required'],
  },
});

module.exports = mongoose.model("Tokens", tokenSchema);
