const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getIndex);

router.get('/books', UserController.findAll);

router.get('/books/:name', UserController.findByName);


module.exports = router;
