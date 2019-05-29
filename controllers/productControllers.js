const Product = require("../models/product");
const mongoose = require("mongoose");

module.exports = {
  getAllProducts: function(req, res, next) {
    Product.find()
      // .select()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          product: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              images: doc.images,
              available: doc.available,
              category: doc.category,
              rating: doc.rating,
              reviews: doc.review
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  getProduct: function(req, res, next) {
    const { productId } = req.params;
    Product.findById(productId)
      .exec()
      .then(product => {
        if (!product) {
          res.status(404).json({
            message: "Product not found"
          });
        }
        res.status(200).json({
          product: product
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Find product by id",
          error: err
        });
      });
  },

  //chua co color, size cac kieu
  createNewProduct: async function(req, res, next) {
    const newProduct = new Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating
    });
    const dataProduct = await newProduct.save();
    res.status(200).json({
      message: "Product added",
      createdProduct: {
        _id: dataProduct._id,
        name: dataProduct.name,
        price: dataProduct.price,
        category: dataProduct.category,
        rating: dataProduct.rating
      },
      request: {
        type: "GET",
        url: "http://localhost:3005/product/" + dataProduct._id
      }
    });
  },

  deleteProduct: (req, res, next) => {}
};
