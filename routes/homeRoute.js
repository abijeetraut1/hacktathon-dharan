const express = require("express");
const { homeController, test, imageDB } = require("../controllers/homeController");

const router = express.Router();

router.route("/home").get(homeController);
router.route("/test").get(test);
router.route("/getVoice").post(imageDB);
module.exports = router;
