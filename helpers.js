function verifyToken(req, res, next) {
    // Get auth header value- zato sto se kroz Header salje token
    const bearerHeader = req.headers["authorization"];
    console.log(typeof bearerHeader);
    // check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at space
        const bearer = bearerHeader.split(" ");
        // get token
        const bearerToken = bearer[1];
        // set token
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        console.log('error');
        res.sendStatus(403);
    }

}

module.exports = {
    verifyToken
}