const User = require("../models/user");
const Product = require("../models/product");

module.exports = {
  getCart: (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
      .exec()
      .then(user => {
        const response = {
          count: user.cart.cartItem.length,
          cart: user.cart
        };
        res.status(200).json({
          result: response
        });
      })
      .catch(err => {
        res.status(404).json({
          message: "cart not found",
          error: err
        });
      });
  },

  addProductToCart: (req, res, next) => {
    const { id, newCart } = req.body;

    User.update(
      { _id: id },
      {
        $set: {
          cart: newCart
        }
      }
    ).then(result => {
      res.status(200).json(result);
    });
  }

  // removeProductFromCart: (req, res, next) => {
  //   const { productId } = req.params;

  // }
};
