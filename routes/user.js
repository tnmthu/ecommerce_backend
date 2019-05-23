var express = require("express");
var router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
  res.status(201).json({
    message: "POST request for /users",
    createdUser: user
  });
});

router.get("/name", (req, res, next) => {
  console.log(req.query.name);
  res.status(200).json({
    name: "Thu"
  });
});
router.post("/name", (req, res) => {
  console.log(req.body.id);
  res.status(200).json({
    status: "success"
  });
});
module.exports = router;
