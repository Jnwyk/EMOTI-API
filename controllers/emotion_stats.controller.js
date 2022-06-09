const db = require("../models/index.js");
const { ValidationError } = require("sequelize");
const EmotionStat = db.emotion_stats;

exports.findAll = async (req, res) => {
    try{
        let childEmotions = await EmotionStat.findAll({ where: { childUsername: req.params.idC } })
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

exports.changeStats = async (req, res) => {
    try{
        if(!req.body.childUsername || !req.body.emotionId){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        if((req.body.right !== 1 && req.body.right !== 0) || (req.body.wrong !== 1 && req.body.wrong !== 0)){
            return res.status(400).json({ success: false, msg: "Wrong data provided" });
        }
        let stat = await EmotionStat.findOne({ where: { childUsername: req.body.childUsername, emotionId: req.body.emotionId }});
        console.log(req.body)
        if(stat === null){
            stat = await EmotionStat.create({
                childUsername: req.body.childUsername,
                emotionId: req.body.emotionId,
                right: req.body.right,
                wrong: req.body.wrong
            })
        }
        else{
            stat = await stat.update({
                right: stat.dataValues.right + req.body.right,
                wrong: stat.dataValues.worng + req.body.wrong
            });
        }
        return res.status(201).json({ success: true, emotion_stat: stat });
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}
