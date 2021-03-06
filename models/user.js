const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const saltRounds = 10;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    cartItem: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        size: {
          type: String,
          required: true
        },
        color: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

// userSchema.pre("save", function(next) {
//   // Check if document is new or a new password has been set
//   if (this.isNew || this.isModified("password")) {
//     // Saving reference to this because of changing scopes
//     const document = this;
//     bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
//       if (err) {
//         next(err);
//       } else {
//         document.password = hashedPassword;
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

userSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

let User = mongoose.model("User", userSchema);

module.exports = User;
