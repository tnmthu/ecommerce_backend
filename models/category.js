const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  }
});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
