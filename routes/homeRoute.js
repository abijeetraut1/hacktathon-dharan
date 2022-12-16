const express = require("express");
const { homeController, test } = require("../controllers/homeController");

const router = express.Router();

router.route("/home").get(homeController);
router.route("/test").get(test);

module.exports = router;
