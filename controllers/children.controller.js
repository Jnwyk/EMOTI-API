const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const { ValidationError } = require("sequelize");
const Child = db.child;

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.username || !req.body.name || !req.body.password || !req.body.gender || !req.body.bod || !req.body.autism_level || !req.body.tutor){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }

        const birthDate = new Date(req.body.bod);
        if(req.body.gender !== 'male' && req.body.gender !== 'female'){
            return res.status(400).json({ success: false, msg: "Wrong gender" });
        }
        else if(req.body.autism_level < 1 || req.body.autism_level > 3){
            return res.status(400).json({ success: false, msg: "Wrong autism level" });
        }
        else if(birthDate >= Date.now()){
            return res.status(400).json({ success: false, msg: "Wrong birth date" });
        }
        else{
            await Child.create({
                username: req.body.username,
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password, 10),
                gender: req.body.gender,
                birth_date: req.body.bod,
                autism_level: req.body.autism_level,
                image: req.body.image,
                tutor: req.body.tutor
            })
            return res.status(201).json({ success: true, message: "New user created", username: req.body.username });
        }
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
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
        return res.status(200).json({ success: true, msg: 'Password was successfully changed.'});
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.getOne = async (req, res) => {
    try{
        if(req.loggedRole !== 'child' || req.loggedUsername !== req.params.id){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        let user = await Child.findOne({ where: { username: req.params.id } });
        return res.status(200).json({ success: true, message: 'User was found', user: user})
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}
