var express = require("express");
var router = express.Router();
const productControllers = require("../controllers/productControllers");
const checkAuth = require("../middleware/check_auth");

/* GET users listing. */
router.post("/", productControllers.getAllProducts);

// router.get("/", productControllers.getAllProducts);

router.get("/:productId", productControllers.getProduct);

router.post("/", checkAuth, productControllers.createNewProduct);

module.exports = router;
