const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { json, urlencoded } = require("body-parser");

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
const PORT = process.env.PORT || 5000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
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

const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

app.use(userRoutes);
app.use(bookRoutes);

app.listen(PORT);
