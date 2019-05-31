const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    imgMain: String,
    imgMore1: String,
    imgMore2: String,
    imgMore3: String,
    imgMore4: String
  },
  available: {
    color: [String],
    size: {
      S: Number,
      M: Number,
      L: Number
    }
  },
  category: String,
  gender: String,
  rating: Number,
  reviews: [
    {
      user: String,
      createdAt: Date,
      header: String,
      content: String,
      stars: Number
    }
  ]
});

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
