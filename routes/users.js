const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();


router.get("/user/:username",UserController.findByUsername);

router.get("/users", UserController.findAll);

router.post("/user/",UserController.create);

router.put("/user/:username",UserController.update);

router.delete("/user/:username",UserController.deleteUser);

router.get('/login', UserController.login);

router.get('/admins', UserController.getAllAdmins);

router.get("/user",UserController.getBook);
router.delete("/user",UserController.removeBook);
router.post("/user",UserController.addBook);

module.exports = router;
