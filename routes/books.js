const express = require('express');

const BookController = require('../controllers/BookController');

const router = express.Router();


router.get('/books', BookController.findAllBooks);

router.get('/books/:id', BookController.findBookById);

router.get('/book_num/:id', BookController.numberOfBooks);

router.post('/add-new', BookController.addNew);

router.post('/edit-book', BookController.postEditProduct);

router.post('/book_inc/:id', BookController.AddOneBook);

router.post('/book_dec/:id', BookController.RemoveOneBook);

router.delete('/delete-book', BookController.postDeleteProduct);

module.exports = router;
