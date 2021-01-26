const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();


router.get('/login', UserController.login);

router.get('/admins', UserController.getAllAdmins);


module.exports = router;
