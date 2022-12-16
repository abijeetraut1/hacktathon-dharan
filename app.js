const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const homeRoute = require("./routes/homeRoute");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "./public")));
// Load the TensorFlow.js library

// Load the image data from a file or URL
// const image = tf.node.decodeImage(fs.readFileSync("./public/images/0.png"), 3);
// const image = Image();
// image.src = "./public/images/0.png";
const image = "../cat.jpg";

app.use("/", homeRoute);

app.all("*", (req, res, next) => {
  return res.render("404");
});

// if the file is greater then 10kb then i will not be accepted
// app.use(express.json({ limit: "10kb" }))
// app.use(cookieParser());
// app.use(express.json({ limit: "10kb" }));
// app.use(cookieParser());

// app.listen(3000,()=>)
module.exports = app;
