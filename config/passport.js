const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            console.log("heyyyyy");
            User.findOne({email:email})
            .then((user)=>{
                //console.log(user);
                if(!user){
                    return done(null,false,{message:'email not registered'});
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'password incorrect'});
                    }
                })
            })
            .catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
}