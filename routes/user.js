var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check_auth");

const userControllers = require("../controllers/userControllers");
/* GET users listing. */

router.get("/", userControllers.getAllUsers);

router.post("/signup", userControllers.createNewUser);

router.get("/:userId", userControllers.getUser);

router.patch("/:userId", checkAuth, userControllers.updateUserInfo);

// router.post("/authenticate", userControllers.authenUser);

router.post("/login", userControllers.login);

module.exports = router;
