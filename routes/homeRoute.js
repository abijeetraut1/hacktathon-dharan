const express = require("express");
const {
  homeController,
  test,
  getRegister,
  postRegister,
} = require("../controllers/homeController");

const router = express.Router();

router.route("/home").get(homeController);
router.route("/register").get(getRegister).post(postRegister);
router.route("/test").get(test);

module.exports = router;
