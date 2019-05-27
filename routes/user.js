var express = require("express");
var router = express.Router();

const userControllers = require("../controllers/userControllers");
/* GET users listing. */

router.get("/", userControllers.getUser);

router.post("/", userControllers.createNewUser);

router.patch("/:userId", userControllers.updateUserInfo);

router.post("/authenticate", userControllers.authenUser);

module.exports = router;
