const mongoose = require("mongoose");

let clothesItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },
  price: {
    type: Number,
    require: true
  },
  rating: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  review: Array,
  size: Array,
  color: Array
});

let ClothesItem = mongoose.model("ClothesItem", clothesItemSchema);

module.exports = ClothesItem;
