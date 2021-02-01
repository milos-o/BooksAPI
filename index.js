const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const flash = require('connect-flash');
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");
require('dotenv').config()
const { json, urlencoded } = require("body-parser");
require('./config/passport.js')(passport)
const app = express();
app.use("/csv",express.static(__dirname+"/csv"));


app.use(urlencoded({ extended: true }));
app.use(json());
const PORT = process.env.PORT || 5000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));


app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

app.use(userRoutes);
app.use(bookRoutes);
// mongodb+srv://Milos:<password>@cluster0.itwut.mongodb.net/<dbname>?retryWrites=true&w=majority || 'mongodb://localhost:27017/booksapi'

const url =
  'mongodb+srv://Rakic:jakasifra123@cluster0.itwut.mongodb.net/test?retryWrites=true&w=majority';


mongoose
  .connect(process.env.MONGODB_URI || url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

