const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();


router.get('/login', UserController.login);


module.exports = router;
