const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
