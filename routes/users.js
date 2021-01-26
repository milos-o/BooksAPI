const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();


router.get("/user/:username",async (req,res) => {
    let username = req.params.username;
    //console.log(username);
    try {
        let user  = await UserController.findByUsername(username);
        if(user){
            res.status(200).json(user);
        }else{
            throw new Error("User doesnt exist");
        }
    } catch (error) {
        console.log(error)
        //Ne vrati gresku vec prazan objekat, {}, dok je u konzoli stampa!
        res.status(400).send(error);
    }
})

router.get("/users", async (req,res) =>{
    try {
        let users = await UserController.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/user/",async (req,res) => {
    //console.log(req.body.user);
    let newUser = req.body.user;
    try {
        let user = await UserController.create(newUser);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/user/:username",async (req,res) => {
    let username = req.params.username;
    let update = req.body.update;
    try {
        let user =await UserController.update(username,update);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/user/:username",async (req,res) => {
    let username = req.params.username;
    try {
        let user = await UserController.deleteUser(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.get('/login', UserController.login);

router.get('/admins', UserController.getAllAdmins);


module.exports = router;
