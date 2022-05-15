const db = require("../models/index.js");
const Emotion = db.emotion;

exports.create = async (req, res) => {
    res.status(201).json({ success: true, message: 'New emotion created.', ID: 'emotion.id'})
}

exports.changeEmotion = async (req, res) => {
    res.status(200).json({ success: true, message: 'Emotion was updated successfully'})
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'Emotion was found.' })
}
