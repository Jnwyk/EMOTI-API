const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const { ValidationError } = require("sequelize");
const Tutor = db.tutor;

exports.getAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Tutor users successfully retrieved'})
}

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.username || !req.body.name || !req.body.password || !req.body.gender || !req.body.bod || !req.body.email){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        await Tutor.create({
            username_tutor: req.body.username,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10),
            gender: req.body.gender,
            // remember to change this line
            birth_date: Date.now(),
            image: req.body.image,
            email: req.body.email
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
    res.status(200).json({ success: true, message: 'Password was successfully changed.'})
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'User was found', username: 'username'})
}
