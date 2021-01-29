const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
}

const isAuth = (req,res,next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        return res.status(401).send("Please log in first.");
        
 }


const isAdmin = (req, res, next) => {
    if(req.user.role === true){
        return next();
    }
    return res.status(401).send("You don't have permission for this access.");
}

module.exports = {
    isAdmin,
    isAuth,
    deleteFile
}