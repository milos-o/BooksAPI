const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.sranje);


router.get('/login', UserController.login);


module.exports = router;
