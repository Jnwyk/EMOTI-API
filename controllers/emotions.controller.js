const { ValidationError } = require("sequelize");
const db = require("../models/index.js");
const Emotion = db.emotion;

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.name){
            return res.status(400).json({ success: false, msg: 'Not enough data provided'});
        }
        let newEmotion = await Emotion.create({
            name: req.body.name,
            image: req.body.image
        });
        return res.status(201).json({ success: true, message: 'New emotion created', id: newEmotion.id})   
    }
    catch(err){
        if(err instanceof ValidationError){
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        }
        else{
            return res.status(500).json({ success: false, msg: err.message || "Unknown error" });
        }
    }
}

exports.changeEmotion = async (req, res) => {
    res.status(200).json({ success: true, message: 'Emotion was updated successfully'})
}

exports.getOne = async (req, res) => {
    try{
        let emotion = await Emotion.findOne({ where: { id: req.params.id } })
        if(emotion === 'undefined'){
            return res.status(404).json({ success: false, msg: "Emotion not found" });
        }
        return res.status(200).json({ success: true, message: 'Emotion was found.' })
    }
    catch(err){
        if(err instanceof ValidationError){
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        }
        else{
            return res.status(500).json({ success: false, msg: err.message || "Unknown error" });
        }
    }
}
