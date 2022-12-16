const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const homeRoute = require("./routes/homeRoute");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "./public")));
// Load the TensorFlow.js library
const tf = require("@tensorflow/tfjs");
// Create a new TensorFlow.js model
const model = async () => {
  await tf.loadLayersModel("./model.json");
};
console.log(model);

// Load the image data from a file or URL
// const image = tf.node.decodeImage(fs.readFileSync("./public/images/0.png"), 3);
// const image = Image();
// image.src = "./public/images/0.png";
const image = "../cat.jpg";

// Make and format the predicitions
const predictions = model.predict(image);
const index = predictions.as1D().argMax();
const classPrediction = index.dataSync()[0];

// Print the predictions
console.log("Result:", classPrediction);

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
