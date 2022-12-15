const express = require("express");
const { homeController } = require("../controllers/homeController");

const router = express.Router();

router.route("/home").get(homeController);

module.exports = router;
