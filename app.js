const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const { min_index } = require("./utils/backend");

const app = express();

// mongoose.connect('mongodb://localhost:27017/gdsc-hackathon')
//     .then(() => {
//         console.log("Database Connected!!!");
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!")
//         console.log(err);
//     });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

console.log(`optimal floor : ${min_index}`);
// a = 3;
app.get("/", (req, res) => {
  res.render("homePage", { min_index });
});

app.all("*", (req, res, next) => {
  // next(new ExpressError('Page Not Found', 404));
  res.send(`Page not found`);
});

// Test commit

app.listen(3000, () => {
  console.log(`Serving on port 3000`);
});
