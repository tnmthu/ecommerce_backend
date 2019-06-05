var express = require("express");
var router = express.Router();
const orderControllers = require("../controllers/orderControllers");

router.post("/", orderControllers.createNewOrder);

router.get("/:orderId", orderControllers.getOrder);

module.exports = router;
