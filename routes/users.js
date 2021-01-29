const express = require("express");
const { body, validationResult } = require("express-validator");
const UserController = require("../controllers/UserController");
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { isAdmin, isAuth } = require("../config/auth");
const router = express.Router();

router.get("/user/:username", UserController.findByUsername);

router.get("/users", isAuth, isAdmin, UserController.findAll);

router.post("/user/", UserController.create);

router.put("/user/:username", UserController.update);

router.delete("/user/:username", UserController.deleteUser);

//router.get("/login", UserController.login);

router.get("/admins", isAuth, isAdmin,  UserController.getAllAdmins);

router.get("/user", UserController.getBook);

router.delete("/user", UserController.removeBook);

router.post("/user", UserController.addBook);

//router.post('/register', UserController.registerUser);


router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;

  //validation passed
  User.findOne({ email: email }).exec((err, user) => {
    console.log(user);
    if (user) {
      errors.push({ msg: "email already registered" });
      res.render("register", { errors, name, email, password, password2 });
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        role: role,
      });

      //hash password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //save pass to hash
          newUser.password = hash;
          //save user
          newUser
            .save()
            .then((value) => {
              console.log(value);
              //req.flash('success_msg','You have now registered!');
              res.send("/users/login");
            })
            .catch((value) => console.log(value));
        })
      );
    }
  });
});

router.post("/logout", (req, res) => {
    req.logout();
    res.status(401).send("You are logged out.");
});

module.exports = router;
