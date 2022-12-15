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

app.use("/", homeRoute);

app.all("*", (req, res, next) => {
  return res.send("Page not found");
});

// if the file is greater then 10kb then i will not be accepted
// app.use(express.json({ limit: "10kb" }))
// app.use(cookieParser());
// app.use(express.json({ limit: "10kb" }));
// app.use(cookieParser());

// app.listen(3000,()=>)
module.exports = app;
