var express = require("express");
var router = express.Router();
const cartControllers = require("../controllers/cartControllers");

router.post("/", cartControllers.addProductToCart);

module.exports = router;
