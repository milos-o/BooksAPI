const express = require('express');

const BookController = require('../controllers/BookController');
const User = require('../models/User');

const router = express.Router();

//router.get('/', BookController.getIndex);

router.get('/books', BookController.findAll);

router.get('/books/:name', BookController.findByName);

router.post("/book",async (req,res)=>{

    try {
        let user=await User.findOne({"username":req.headers.username}).exec();
        console.log(user)
        if(user){
            newBook = req.body;
            newBook["user"]=user._id;
            //console.log(newBook);
           
            let book = await BookController.create(newBook);
            console.log(book);
            User.updateOne({_id:user._id},{$push: {"books":book._id}}).exec();
            
            res.status(200).json(book);
            
        }else{
            throw new Error("User doesnt exist");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;
