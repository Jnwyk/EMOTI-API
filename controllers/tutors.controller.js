const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const { ValidationError } = require("sequelize");
const Tutor = db.tutor;

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.username || !req.body.name || !req.body.password || !req.body.gender || !req.body.dob || !req.body.email){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        
        const birthDate = new Date(req.body.dob);
        if(req.body.gender !== 'male' && req.body.gender !== 'female'){
            return res.status(400).json({ success: false, msg: "Wrong gender" });
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
            return res.status(400).json({ success: false, msg: "Wrong email" });
        }
        else if(birthDate >= Date.now()){
            return res.status(400).json({ success: false, msg: "Wrong birthdate" });
        }
        else{
            await Tutor.create({
                username: req.body.username,
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password, 10),
                gender: req.body.gender,
                birth_date: req.body.dob,
                image: req.body.image,
                email: req.body.email
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
        if(req.loggedUsername !== req.body.username || req.loggedRole !== 'tutor'){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        if(!req.body.password){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        Tutor.update({
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
        if(req.loggedRole !== 'tutor' || req.loggedUsername !== req.params.id){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        let user = await Tutor.findOne({ where: { username: req.params.id } });
        console.log(user)
        return res.status(200).json({ success: true, message: 'User was found', user: user})
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.deleteOne = async (req, res) => {
    try{
        let tutorUser = await Tutor.findOne({ where: { username: req.params.id } });
        if(tutorUser === 'undefined'){
            return res.status(404).json({ success: false, msg: "Tutor not found"});
        }
        if(req.loggedUsername !== tutorUser.username){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        await Tutor.destroy({ where: { username: req.params.id } });
        return res.status(200).json({ success: true, msg: "Tutor succesfully deleted", tutor: tutorUser})
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}