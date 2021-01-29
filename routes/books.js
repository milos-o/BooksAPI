const express = require('express');
const { verifyToken } = require('../helpers');
const { body, validationResult } = require('express-validator');
const { isAuth, isAdmin } = require("../config/auth");
const BookController = require('../controllers/BookController');
const User = require('../models/User');

const router = express.Router();


router.get('/books', isAuth,  BookController.findAllBooks);

router.get('/books/:id', BookController.findBookById);


router.get('/book_num/:id', BookController.numberOfBooks);

router.post('/add-new', [
    body('price')
      .isNumeric()
      .withMessage('Price has to be a number.')
      ,
    body('name')
      .isLength({ min: 3, max: 15 })
      .isAlphanumeric()
      .trim(),
    body('description')
    .isLength({ min: 10, max: 150 })
      .trim(),
    body('price')
      .isNumeric({ min: 1, max: 10000 }),
    body('quantity')
      .isNumeric({ min: 1, max: 10 }),
      body('pages')
      .isNumeric({ min: 10, max: 50000 })
      
  ], BookController.addNew);

router.post('/edit-book', BookController.postEditProduct);

router.post('/book_inc/:id', BookController.AddOneBook);

router.post('/book_dec/:id', BookController.RemoveOneBook);

router.delete('/delete-book', BookController.postDeleteProduct);

router.get('/values', BookController.getMoney);

module.exports = router;
