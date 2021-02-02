const express = require("express");
const { body, validationResult } = require("express-validator");
const UserController = require("../controllers/UserController");
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { isAdmin, isAuth } = require("../config/auth");
const router = express.Router();

router.get("/user/:username",isAuth, UserController.findByUsername);

router.get("/users", isAuth,  UserController.findAll);

router.post("/user/", UserController.create);

router.put("/user/:username",isAuth, UserController.update);

router.delete("/user/:username", isAuth, UserController.deleteUser);

router.get("/admins", isAuth, isAdmin,  UserController.getAllAdmins);

router.get("/user", isAuth, UserController.getBook);

router.delete("/user", isAuth, UserController.removeBook);

router.post("/user", isAuth, UserController.addBook);

router.get("/logSucces",(req,res)=>{
  res.status(200).send("Loged in succesfully!!");
})
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/logSucces",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;

 
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
              res.redirect("/login");
            })
            .catch((value) => console.log(value));
        })
      );
    }
  });
});

router.post("/logout", (req, res) => {
    req.logout();
    res.status(200).send("You are logged out.");
});

module.exports = router;
