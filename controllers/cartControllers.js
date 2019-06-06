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
    const { userId } = req.body;
    // console.log("here");
    const newCart = {
      item: req.body.item,
      name: req.body.name,
      size: req.body.size,
      color: req.body.color,
      quantity: req.body.quantity,
      price: req.body.price
    };
    User.findById(userId)
      .exec()
      .then(user => {
        const cart = user.cart;
        console.log("dau", cart);
        cart.cartItem.push(newCart);
        User.update(
          { _id: userId },
          {
            $set: {
              cart: cart
            }
          }
        ).then(result => {
          console.log(cart.cartItem);
          res.status(200).json({
            cart: cart.cartItem
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to add to cart",
          error: err
        });
      });
  },

  removeProductFromCart: (req, res, next) => {
    const { productId } = req.params;
  }
};
