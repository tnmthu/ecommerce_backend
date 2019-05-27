const Product = require("../models/product");
module.exports = {
  addProductToCart: (req, res, next) => {
    const { id, productId, size, color, quantity } = req.body;
    User.update(
      { _id: id },
      {
        $push: {
          "cart.cartItem": {
            item: productId,
            size,
            color,
            quantity
          }
        }
      }
    ).then(result => {
      res.status(200).json(result);
    });
  }
};
