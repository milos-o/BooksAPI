const express = require('express');

const BookController = require('../controllers/BookController');

const router = express.Router();

router.get('/', BookController.getIndex);

router.get('/books', BookController.findAll);

router.get('/books/:name', BookController.findByName);


module.exports = router;
