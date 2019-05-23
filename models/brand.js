const mongoose = require("mongoose");

let brandSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  }
});

let Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
