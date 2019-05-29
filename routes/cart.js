var express = require("express");
var router = express.Router();
const cartControllers = require("../controllers/cartControllers");

router.get("/:userId", cartControllers.getCart);

router.post("/", cartControllers.addProductToCart);

// router.get("/:productId", cartControllers.removeProductFromCart);

module.exports = router;
