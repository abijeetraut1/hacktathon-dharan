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
  sendMyLocation,
  getLocation,
  getRegisterPhone,
  dumbFeature,
} = require("../controllers/homeController");
const { protectMiddleware } = require("../services/authController");
const { getLocationFromDb } = require("../services/sendLocation");

const router = express.Router();

router.route("/home").get(homeController);
router.route("/register").get(getRegister).post(postRegister);
router.route("/users").get(getUsers);
router.route("/features").get(protectMiddleware, getFeatures);
router.route("/imageRecognition").get(protectMiddleware, getImageRecognition);
router.route("/speechToText").get(protectMiddleware, getSpeechToText);
router.route("/sendMyLocation").get(protectMiddleware, sendMyLocation);
router.route("/getLocation").post(protectMiddleware, getLocation);
router.route("/getLocaionFromDb").post(protectMiddleware, getLocationFromDb);
router.route("/dumbfeature").get(dumbFeature);

router.route("/test").get(test);

module.exports = router;
