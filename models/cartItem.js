const mongoose = require("mongoose");

let cartItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  color: String,
  size: String,
  quantity: Number,
  cost: Number
});

let CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
