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

module.exports = {
    findByUsername,
    findAll,
    create,
    update,
    deleteUser,
}