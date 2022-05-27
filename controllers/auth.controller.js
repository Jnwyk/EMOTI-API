const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/db.config');
const {ValidationError} = require('sequelize');

const db = require('../models/index.js');
const Psychologist = db.psychologist;
const Tutor = db.tutor;
const Child = db.child;

exports.verifyToken = (req, res, next) => {
    const tokenHeader = req.headers['x-access-token'] || req.headers.authorization;
    if(tokenHeader == 'undefined'){
        return res.status(401).json({ success: false, msg: "No token provided"});
    }

    const bearer = tokenHeader.split(' ');
    const token = bearer[1];

    try{
        let decoded = jwt.verify(token, config.SECRET)
        req.loggedUsername = decoded.username;
        next();
    }
    catch{
        return res.status(401).json({ success: false, msg: "Not authorized"});
    }
}

exports.login = async (req, res) => {
    try{
        if(!req.body || !req.body.username || !req.body.password || !req.body.role){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        
        let user;
        if(req.body.role === 'child'){
            user = await Child.findOne({ where: { username_child: req.body.username } });
            if(!user){
                return res.status(400).json({ success: false, msg: "No user found" });
            }
        }
        else if(req.body.role === 'tutor'){
            console.log(Tutor);
            user = await Tutor.findOne({ where: { username_tutor: req.body.username } });
            if(!user){
                return res.status(400).json({ success: false, msg: "No user found" });
            }
        }
        else if(req.body.role === 'psychologist'){
            user = await Psychologist.findOne({ where: { username_psychologist: req.body.username } });
            if(!user){
                return res.status(400).json({ success: false, msg: "No user found" });
            }
        }
        else{
            return res.status(400).json({ success: false, msg: "Role does not exist" });
        }
        console.log(user.password, "\n", req.body.password);
        // const check = bcrypt.compareSync(req.body.password, user.password);
        // console.log(check);
        // if(!check){
        //     return res.status(401).json({ success: false, msg: "Wrong password" });
        // }

        const token = jwt.sign({ username: req.body.username, role: req.body.role },
            config.SECRET, { expiresIn: "24h" });
        return res.status(200).json({ success: true, msg: "User logged in", token: token })
    }
    catch(err){
        if(err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "Some error occurred at login."});
    }
}