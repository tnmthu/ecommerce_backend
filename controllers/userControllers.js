const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: function(req, res, next) {
    User.find()
      // .select("firstName lastName email _id")
      // .populate("Product")
      .exec()
      .then(users => {
        const response = {
          count: users.length,
          users: users.map(user => {
            return {
              user,
              // cart: doc.cart,
              request: {
                type: "GET",
                url: "http://localhost:3005/user/" + user._id
              }
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

  getUser: function(req, res, next) {
    const { userId } = req.params;
    User.findById(userId)
      .select("firstName lastName email")
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: "User not found"
          });
        }
        res.status(200).json({
          user: user
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "find user by id",
          error: err
        });
      });
  },

  createNewUser: async (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email is already used"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  res.status(201).json({
                    message: "new user created",
                    user: result
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  },

  updateUserInfo: (req, res, next) => {
    const id = req.params.userId;
    const { ops } = req.body;
    const updateOps = {};
    console.log(ops);
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User updated",
          request: {
            type: "GET",
            url: "http://localhost:3005/user/" + id
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  login: function(req, res, next) {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed - no user found"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed - wrong pw"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                cart: user[0].cart
              },
              "secretKey",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed - shit happens"
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }

  // auth: function(req, res) {}

  // authenUser: function(req, res) {
  //   const { email, password } = req.body;
  //   User.findOne({ email }, function(err, user) {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({
  //         error: "Internal error please try again"
  //       });
  //     } else if (!user) {
  //       res.status(401).json({
  //         error: "Incorrect email or password"
  //       });
  //     } else {
  //       user.isCorrectPassword(password, function(err, same) {
  //         if (err) {
  //           res.status(500).json({
  //             error: "Internal error please try again"
  //           });
  //         } else if (!same) {
  //           res.status(401).json({
  //             error: "Incorrect email or password"
  //           });
  //         } else {
  //           // Issue token
  //           const payload = { email };
  //           const token = jwt.sign(payload, secret, {
  //             expiresIn: "1h"
  //           });
  //           res.cookie("token", token, { httpOnly: true }).sendStatus(200);
  //         }
  //       });
  //     }
  //   });
  // }
};
