const mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  totalCost: {
    type: Number,
    required: true
  }
});

let Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
