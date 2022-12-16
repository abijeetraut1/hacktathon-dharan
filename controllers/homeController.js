const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const image =
  "data:image/jpeg;base64,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";

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const cookieOptions = {
  // expires: new Date(
  //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  // ),
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  // maxAge: 900000,
  httpOnly: true,
};

const createToken = (user, statusCode, res) => {
  const token = signInToken(user._id);

  //send cookie in response

  res.cookie("jwt", token, cookieOptions);
  res.redirect("/features");
};

exports.homeController = async (req, res) => {
  if (req.cookies.jwt) {
    return res.redirect("/features");
  }
  res.render("home");
};

exports.getRegister = async (req, res) => {
  if (req.cookies.jwt) {
    return res.redirect("/features");
  }
  res.render("register");
};
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    status: 200,
    users,
  });
};

exports.dumbFeature = async (req, res) => {
  res.render("dumbFeature");
};
exports.postRegister = async (req, res) => {
  const { name } = req.body;
  const phone = req.body.phone || 9816366094;
  if (!name) return res.send("name is required");
  const userExists = await User.findOne({ name: name });
  if (userExists) return res.render("register");
  const user = await User.create({ name, phone });
  createToken(user, 201, res);
};
exports.getFeatures = async (req, res) => {
  res.render("features");
};

exports.getImageRecognition = async (req, res) => {
  res.render("imageRecognition");
};
exports.getSpeechToText = async (req, res) => {
  res.render("getSpeechToText");
};
exports.sendMyLocation = async (req, res) => {
  res.render("sendMyLocation");
};
exports.getLocation = async (req, res) => {
  const { id } = req.user;
  const { location } = req.body;
  if (!location) return;
  const user = await User.findById(id);
  user.location = location;
  await user.save();

  res.json({
    status: 200,
    location,
  });
};
exports.test = async (req, res) => {
  // var config = {
  //   imageName: 'path-to-image.jpg', // preferrably in JPG format and less than 100 kB
  //   sensitivity: 50, // ranges from 1 to 100
  //   tolerance: 50, // ranges from 1 to 100
  // }

  // let dat = detectObject(config).then(function (response) {

  //   var base64Img = response.base64Img

  //   // use base64Img in html image tag ...
  //   imageElement.setAttribute('src', image, + base64Img)

  //   // save base64Img as image file ...
  //   fs.writeFile('object.jpg', base64Img, {
  //     encoding: 'base64'
  //   }, function () {
  //     console.log('Saved object image')
  //   })
  // })

  res.status(200).json({
    status: "success",
    message: dat,
  });
};
