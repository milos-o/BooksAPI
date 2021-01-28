const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Book= require('../models/Book');

function findByUsername (req,res){
    let username = req.params.username;
    User.findOne({"username":username}).then((user)=>{
        if(user===null) throw new Error("User doesn't exist");
        res.status(200).json(user);
    })
    .catch((error)=>{
      console.log(error);
      res.status(400).json(error);  
    })
}
function findAll(req,res){
    User.find({}).then((users)=>{
        res.status(200).json(users);
    })
    .catch((error)=>{
        res.status(400).json(error);
    })
}


 function create(req,res,next) {
    if(req.query.username || req.query.id) next();
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    let role = req.body.role;
    let email =req.body.email;
    let book=req.body.book;
    let newUser={
        username,
        password,
        role,
        email,
        book
    }
    User.create(newUser).then((user)=>{
        res.status(201).json(user);
    })
    .catch(error=>{
        res.status(400).json(error);
    })
}


function update(req,res,next){
    
    if(req.query.username || req.query.id) next();

    let username = req.params.username;
    let update = req.body.update;

    User.findOneAndUpdate({"username":username},update,{new:true})
    .then((user)=>{
        res.status(201).json(user);
    })
    .catch((error)=>{
        res.status(400).json(error);
    })
}

function deleteUser(req,res,next){

    if(req.query.username || req.query.id) next();

    let username=req.params.username;

    User.findOneAndDelete({"username":username})
    .then((user)=>{
        //returns deleted user;
        res.status(200).json(user);
    })
    .catch ((error)=>{
        res.status(400).json(error);
    }) 
}

function getBook(req,res){
    let bookId=req.query.id;
    Book.findById(bookId).then((book)=>{
        res.status(200).json(book);
    });    
}
function addBook(req,res){
    let user = req.query.username;
    let book = req.query.id;
    console.log(user);
    console.log(book);
    User.findOneAndUpdate({"username":user},{$push: {"book": mongoose.Types.ObjectId(book)}},{
        new:true,
        upsert:true
    })
    .then((user)=>{
        console.log(user);
        res.status(200).json(user);
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error);
    })
}
function removeBook(req,res){
    let user=req.query.username;
    let bookId =req.query.id;
    User.findOneAndUpdate({"username":user},{$pull:{"book":mongoose.Types.ObjectId(bookId)}},{
        new:true
    })
    .then((user)=>{
        console.log("removed book from user");
        console.log(user);
        res.status(200).json(user);
    })
    .catch((e)=>{
        res.status(400).json(e);
    })
}
function updateBook(req,res){
    let user=req.query.username;
    let bookId =req.query.id;
    let update = req.body;
    Book.findByIdAndUpdate(bookId,update,{new:true})
    .then((book)=>{
        res.status(200).json(book);
    }).catch((e)=>{
        res.status(400).json(e);
    })
}
function comparePassword(username,plainPwd){
    User.findOne({"username":username}).then((user)=>{
        let password = user.password;
        let match = bcrypt.compareSync(plainPwd,password);
        
        return match;
    }).catch((e)=>{
        return e;
    })
}

function login(){
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
    findByUsername,
    findAll,
    create,
    update,
    deleteUser,
    login,
    getAllAdmins,
    getBook,
    addBook,
    removeBook,
    updateBook,
    comparePassword,


}