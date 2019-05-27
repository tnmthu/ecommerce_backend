var express = require("express");
var router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

/* GET users listing. */
router.get("/", function(req, res, next) {
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
});

router.post("/", async function(req, res, next) {
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
      url: "http://localhost:3005/product" + dataProduct._id
    }
  });
});

module.exports = router;
