const db = require("../models/index.js");
const EmotionStat = db.emotion_stats;

exports.findAll = async (req, res) => {
    try{
        let childEmotions = await EmotionStat.findAll({ where: { childUsernameChild: req.params.idC } })
        if(childEmotions === 'undefined'){
            return res.status(404).json({ success: false, msg: "User not found" })
        }
        return res.status(200).json({ success: true, message: 'Emotion statistics found', stats: childEmotions})
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.childUsername || !req.body.emotionId){
            return res.status(400).json({ success: false, msg: 'Not enough data provided'});
        }
        let childEmotion = EmotionStat.create({
            
        })
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}
