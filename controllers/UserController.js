const User = require('../models/User');

function findByName(id) {
    return new Promise((resolve, reject) => {
        try {
            console.log(id)
            resolve(User.findById(id).exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.find({}).lean().exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function create(newUser) {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.create(newUser))
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

module.exports = {
    findByName,
    findAll,
    create
}