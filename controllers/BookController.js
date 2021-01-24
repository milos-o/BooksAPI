const Book = require('../models/Book');

function findByName(id) {
    return new Promise((resolve, reject) => {
        try {
            console.log(id)
            resolve(Book.findById(id).exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Book.find({}).lean().exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function create(newBook) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Book.create(newBook))
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}


module.exports = {
    findByName,
    findAll,
    create,
}