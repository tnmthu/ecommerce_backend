var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).json({
    status: "here at home",
    name: "Thu",
    age: 19
  });
});

module.exports = router;
