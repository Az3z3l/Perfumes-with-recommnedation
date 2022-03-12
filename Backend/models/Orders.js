const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "product name is required"],
  },
  products: {
    type: Object,
    required: false,
  },
  image:{
      type: String,
      default:"https://i.insider.com/61135525ad63f30019501966?width=700",
  },
  created: {
    type: Number,
    default: Date.now(),
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Orders", ordersSchema);
