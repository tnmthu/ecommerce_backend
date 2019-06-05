const Order = require("../models/order");
const mongoose = require("mongoose");

module.exports = {
  createNewOrder: async function(req, res, next) {
    const newOrder = new Order({
      _id: mongoose.Types.ObjectId(),
      userMail: req.body.userMail,
      totalPrice: req.body.totalPrice
    });
    const dataOrder = await newOrder.save();
    res.status(200).json({
      message: "Order added",
      createdOrder: {
        _id: dataOrder._id,
        userMail: dataOrder.userMail,
        totalPrice: dataOrder.totalPrice
      },
      request: {
        type: "GET",
        url: "http://localhost:3005/order/" + dataOrder._id
      }
    });
  },
  getOrder: function(req, res, next) {
    const { orderId } = req.params;
    // console.log(orderId, req.params);
    Order.findById(orderId)
      .exec()
      .then(order => {
        if (!order) {
          res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Find order by id",
          error: err
        });
      });
  }
};
