const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userMail: String,
  totalPrice: Number
});

let Order = mongoose.model("Order", orderSchema);

module.exports = Order;
