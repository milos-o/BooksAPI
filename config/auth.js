
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
    isAuth
}