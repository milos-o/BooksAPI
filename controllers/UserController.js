const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
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

function login(){
    const user = {
        id: 1,
        username: "Korisnik",
        email: "korisnik@gmail.com"
    };

    jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
        res.json({
            token
        })
    });
}

function login(){
    const user = {
        id: 1,
        username: "Korisnik",
        email: "korisnik@gmail.com"
    };

    jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
        res.json({
            token
        })
    });
}

const sranje = (req, res, next) => {
   res.send("jebi se");
  };

module.exports = {
    findByName,
    findAll,
    create,
    login,
    sranje
}