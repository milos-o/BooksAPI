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

const login = (req, res, next) => {
    const user = {
        username: req.body.useranem,
        password: req.body.password,
        email: req.body.email
    };

    jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
        res.json({
            token
        })
    });
}

const getAllAdmins = (req, res, next) => {

    User.find({role: true})
        .then(admins => {
            return res.status(200).json(admins);
        })
        .catch((err) => {
            console.log(err);
        })
}


module.exports = {
    findByName,
    findAll,
    create,
    login,
    getAllAdmins
}