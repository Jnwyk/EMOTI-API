const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const { ValidationError } = require("sequelize");
const Child = db.child;

exports.getAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Child users successfully retrieved'})
}

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.username || !req.body.name || !req.body.password || !req.body.gender || !req.body.bod || !req.body.autism_level){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        console.log(req.body);
        await Child.create({
            username: req.body.username,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10),
            gender: req.body.gender,
            // remember to change this line
            birth_date: Date.now(),
            autism_level: req.body.autism_level,
            image: req.body.image,
            email_tutor: req.body.email
        })
        res.status(201).json({ success: true, message: "New user created", username: req.body.username });
    }
    catch(err){
        if(err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.changePassword = async (req, res) => {
    try{
        if(req.loggedUsername !== req.body.username || req.loggedRole !== 'child'){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        if(!req.body.password){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        Child.update({
            password: bcrypt.hashSync(req.body.password, 10)
        }, { where: { username: req.loggedUsername } });
        res.status(200).json({ success: true, msg: 'Password was successfully changed.'});
    }
    catch(err){
        if(err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'User was found', username: 'username'})
}
