const User = require("../models/user");
module.exports = {
  getUser: function(req, res, next) {
    User.findById("5ce6ab76617158302c25f6ac")
      // .select("firstName lastName email _id")
      // .populate("Product")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              firstName: doc.firstName,
              lastName: doc.lastName,
              email: doc.email,
              _id: doc._id,
              cart: doc.cart,
              request: {
                type: "GET",
                url: "http://localhost:3005/user/" + doc._id
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

  createNewUser: async (req, res, next) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    const dataUser = await user.save();
    res.status(200).json({
      message: "POST request for /users",
      createdUser: {
        dataUser,
        request: {
          type: "GET",
          url: "http://localhost:3005/user/" + dataUser._id
        }
      }
    });
  },

  updateUserInfo: (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
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

  authenUser: function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again"
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email or password"
        });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again"
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password"
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h"
            });
            res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          }
        });
      }
    });
  }
};
