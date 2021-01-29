const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passwordValidator = require("password-validator");
const emailValidator = require("email-validator");

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
    //console.log("hey");
    User.find({}).then((users)=>{
        res.status(200).json(users);
    })
    .catch((error)=>{
        res.status(400).json(error);
    })
}
function validatePassword(password){
    let schema = new passwordValidator();
    schema
    .is().min(5)
    .is().max(25)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1);
    return schema.validate(password);
}

 function create(req,res,next) {
    if(req.query.username || req.query.id) next();

    let username = req.body.username;
    if(username.length<3 || username.length>20 ){
        return res.status(400).send("bad username");
        
    }
    if(req.body.password){
        if(!validatePassword(req.body.password)){
            return res.status(400).send("invalid password");
        }
    }
    let password = bcrypt.hashSync(req.body.password,10);
    let role = req.body.role;
    if(!emailValidator.validate(req.body.email)){
        return res.status(400).send("Bad email");
    }
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
    let update = req.body;
    
    if(!(req.user.username===username) && !(req.user.role)){
        return res.status(403).send("You don't have permissions.")
    }
    if(update["username"]){
        if(update["username"].length<3 || update["username"].length>20 ){
            return res.status(400).send("bad username");
            
        }
    }
    if(update["password"]){
        console.log("mjenja pwd");
        if(!validatePassword(update["password"])){
            return res.status(400).send("cant update,invalid password")
        }
        update["password"]= bcrypt.hashSync(update["password"],10);
    }
    if(update["email"]){
        if(!emailValidator.validate(update["email"])){
            return res.status(400).send("Bad email");
        }
    }
    console.log("pass: ",update["password"]);
    //if(username!=req.is)
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

    //console.log(req.user);
    if(!(req.user.username===username) && !(req.user.role)){
        return res.status(403).send("You don't have permissions.")
    }


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
    if(!(req.user.username===user) && !(req.user.role)){
        return res.status(403).send("You don't have permissions.")
    }
    //console.log(user);
    //console.log(book);
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
    if(!(req.user.username===user) && !(req.user.role)){
        return res.status(403).send("You don't have permissions.")
    }
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

    if(!(req.user.username===user) && !(req.user.role)){
        return res.status(403).send("You don't have permissions.")
    }

    let bookId =req.query.id;
    let update = req.body;
    Book.findByIdAndUpdate(bookId,update,{new:true})
    .then((book)=>{
        res.status(200).json(book);
    }).catch((e)=>{
        res.status(400).json(e);
    })
}
/*
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
*/
const getAllAdmins = (req, res, next) => {

    User.find({role: true})
        .then(admins => {
            return res.status(200).json(admins);
        })
        .catch((err) => {
            console.log(err);
        })
}

const registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role
        })
        user.save();
      } catch (e){
        console.log(e);
      }
 }

 async function getAdmins(){
    let admins = await User.find({role: true}).exec();
    return admins;
 
}


module.exports = {
    findByUsername,
    findAll,
    create,
    update,
    deleteUser,
    getAllAdmins,
    getAdmins,
    getBook,
    addBook,
    removeBook,
    updateBook,
    registerUser

}