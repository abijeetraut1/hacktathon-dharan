const express = require("express");
const {
  homeController,
  test,
  getRegister,
  postRegister,
  getUsers,
  getFeatures,
  getImageRecognition,
  getSpeechToText,
} = require("../controllers/homeController");

const router = express.Router();

router.route("/home").get(homeController);
router.route("/register").get(getRegister).post(postRegister);
router.route("/users").get(getUsers);
router.route("/features").get(getFeatures);
router.route("/imageRecognition").get(getImageRecognition);
router.route("/speechToText").get(getSpeechToText);
router.route("/test").get(test);

module.exports = router;
