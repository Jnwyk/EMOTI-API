const db = require("../models/index.js");
const EmotionStat = db.emotion_stats;

exports.findAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Emotion statistics found.'})
}
