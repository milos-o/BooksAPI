const mongoose = require("mongoose");
const { validationResult } = require('express-validator/check');
const Book = require("../models/Book");
const User = require("../models/User");
const Helper = require("../helpers");

const findBookById =  (req, res, next) => {
  bookId = req.params.id;
  Book.findById(bookId).then(results =>{
      return res.send(results);
  });
};

const findAllBooks = (req, res, next) => {
    console.log("evo ga baja");
    console.log(req.user);
    Book
      .find({})
      .then((results) => {
          console.log(results)
        return res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
  {
    "name": "Lotr",
    "description": "Hohohohoho",
    "price": 15,
    "quantity": 3,
    "pages": 450

    {
     "name": "Game of thrones",
     "description": "Hohohohohooooooooooooooo",
     "price": 15,
     "quantity": 3,
     "pages": 4500
       
}
      {
     "email": "milos@badun.com",
     "password": "12345"
     
       
}
}
*/
const addNew = (req, res, next) => {
  const name = req.body.name;
  //const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const pages = req.body.pages;
  const userId = req.user._id;
  //    const imageUrl = image.path;
//console.log(req.user);

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
    userId: userId
  });

  //req.user.book.push(mongoose.Types.ObjectId(book._id));
  console.log(book._id);
  User.findByIdAndUpdate(userId, { $push: { book: book._id } }).exec();

  book
    .save()
    .then((result) => {
      console.log("Created Product");
      Helper.sendMailToAdmin(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
      console.log("DESTROYED PRODUCT");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

const numberOfBooks = (req, res, next) => {
    bookId = req.params.id;
    Book.findById(bookId)
        .then(book => {
            return res.status(200).json(book.quantity);
        })
        .catch((err) => {
            console.log(err)
        })
}

const AddOneBook = (req, res, next) => {
    bookId = req.params.id;
    
    Book.findById(bookId)
        .then(book => {
            book.quantity += 1;
            return book.save().then((result) =>{
                console.log("Book quantity updated!");
                return res.status(200);
            })
        }).catch((err) => {
            console.log(err);
        });

}

const RemoveOneBook = (req, res, next) => {
    bookId = req.params.id;
    
    Book.findById(bookId)
        .then(book => {
            book.quantity -= 1;
            return book.save().then((result) =>{
                console.log("Book quantity updated!");
                return res.status(200);
            })
        }).catch((err) => {
            console.log(err);
        });
}


module.exports = {
  findAllBooks,
  addNew,
  postEditProduct,
  postDeleteProduct,
  findBookById,
  AddOneBook,
  RemoveOneBook,
  numberOfBooks,
};

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoia2trMTIzIiwiZW1haWwiOiJtaWxvc0B0ZXN0LmNvbSJ9LCJpYXQiOjE2MTE2ODYyNzIsImV4cCI6MTYxMTY4OTg3Mn0.YAl4KtDDnEL_XrgKsXwn_WM3kgNi5ySdgKJpy5eJaYM*/
