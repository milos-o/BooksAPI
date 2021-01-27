const mongoose = require("mongoose");

const Book = require("../models/Book");

const findBookById =  (req, res, next) => {
  bookId = req.params.id;
  Book.findById(bookId).then(results =>{
      return res.send(results);
  });
};

const findAllBooks = (req, res, next) => {
    
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
  

const addNew = (req, res, next) => {
  const name = req.body.name;
  //const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const pages = req.body.pages;

  //    const imageUrl = image.path;

  const book = new Book({
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    pages: pages,
  });
  book
    .save()
    .then((result) => {
      console.log("Created Product");
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

