const mongoose = require("mongoose");
const { validationResult } = require("express-validator/check");
const Book = require("../models/Book");
const User = require("../models/User");
const Helper = require("../helpers");

const findBookById = (req, res, next) => {
  bookId = req.params.id;
  Book.findById(bookId)
    .then((results) => {
      return res.send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const findAllBooks = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  console.log(limit);
  console.log(offset);

  Book.find({})
    .limit(limit)
    .skip(offset)
    .exec()
    .then((results) => {
      console.log(results);
      return res.send(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const addNew = (req, res, next) => {
  const name = req.body.name;
  //const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const pages = req.body.pages;
  const userId = req.user._id;
  //    const imageUrl = image.path;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const book = new Book({
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    pages: pages,
    userId: userId,
  });

 
  User.findByIdAndUpdate(userId, { $push: { book: book._id } }).exec();

  book
    .save()
    .then((result) => {
      console.log("Created Product");
      Helper.sendMailToAdmin(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const postEditProduct = (req, res, next) => {
  const bookId = req.body.bookId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;
  const updatedPages = req.body.pages;

  Book.findById(bookId)
    .then((book) => {
      //  if (book.userId.toString() !== req.user._id.toString()) {
      //    return res.redirect('/');
      //  }
      book.name = updatedName;
      book.price = updatedPrice;
      book.description = updatedDesc;
      book.pages = updatedPages;
      if (image) {
        fileHelper.deleteFile(book.imageUrl);
        book.imageUrl = image.path;
      }
      return book.save().then((result) => {
        res.status(200).json(result);
      });
    })
    .catch((error) => {
       console.log(error);
      res.status(400).json(error);
    });
};

const postDeleteProduct = (req, res, next) => {
  const bookId = req.body.bookId;
  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return next(new Error("Product not found."));
      }
      //fileHelper.deleteFile(product.imageUrl);
      return Book.deleteOne({ _id: bookId });
    })
    .then(() => {
      res.status(200).send("Successfully deleted.");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const numberOfBooks = (req, res, next) => {
  bookId = req.params.id;
  Book.findById(bookId)
    .then((book) => {
      return res.status(200).json(book.quantity);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const AddOneBook = (req, res, next) => {
  bookId = req.params.id;

  Book.findById(bookId)
    .then((book) => {
      book.quantity += 1;
      return book.save().then((result) => {
        console.log("Book quantity updated!");
        return res.status(200);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const RemoveOneBook = (req, res, next) => {
  bookId = req.params.id;

  Book.findById(bookId)
    .then((book) => {
      book.quantity -= 1;
      return book.save().then((result) => {
        console.log("Book quantity updated!");
        return res.status(200);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

const getMoney = async (req, res, next) => {
  let totalPrice = 0;
  let number = 0;
  records = await Book.find().where("_id").in(req.user.book).exec();

  records.forEach((element) => {
    number = element.quantity * element.price;
    totalPrice += number;
  });

  return res.status(200).json(totalPrice);
};

module.exports = {
  findAllBooks,
  addNew,
  postEditProduct,
  postDeleteProduct,
  findBookById,
  AddOneBook,
  RemoveOneBook,
  numberOfBooks,
  getMoney,
};
