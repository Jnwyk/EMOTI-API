const jwt = require('jsonwebtoken');
const config = require('../config/db.config');

exports.verifyToken = (req, res, next) => {
    const tokenHeader = req.headers['x-access-token'] || req.headers.authorization;
    if(tokenHeader == 'undefined'){
        return res.status(401).json({ success: false, msg: "No token provided"});
    }

    const bearer = tokenHeader.split(' ');
    const token = bearer[1];

    try{
        let decoded = jwt.verify(token, config.SECRET)
        req.username = decoded.username;
        next();
    }
    catch{
        return res.status(401).json({ success: false, msg: "Not authorized"});
    }
}