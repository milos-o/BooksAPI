const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require('../models/User');

function findByUsername(username) {
    return new Promise((resolve, reject) => {
        try {
            
            resolve(User.findOne({"username":username}).exec());
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
            reject(e)
        }

    })
}

function create(newUser) {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.create(newUser));
        } catch (e) {
            reject(e)
        }

    })
}


function update(username,update){
    return new Promise((resolve,reject) =>{
        try {
            resolve(User.findOneAndUpdate({"username":username},update,{new: true }));
        } catch (error) {
            reject(error)
        }
    })
}

function deleteUser(username){
    return new Promise((resolve,reject) =>{
        try {
            resolve(User.findOneAndDelete({"username":username}));
        } catch (error) {
            reject(error)
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
    findByUsername,
    findAll,
    create,
    update,
    deleteUser,
    login,
    getAllAdmins

}