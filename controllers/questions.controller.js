const db = require("../models/index.js");
const Question = db.question;
const {ValidationError} = require('sequelize');

exports.getAll = async (req, res) => {
    try{
        let questions = await Question.findAll({ attributies: ['id', 'text', 'answer']})
        return res.status(200).json({ success: true, message: 'Questions successfully retrieved.', questions: questions});
    }
    catch{
        return res.status(500).json({ success: false, msg: "Something went wrong"});
    }
}

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.username_tutor || !req.body.text){
            return res.status(400).json({ success: false, msg: "Not enough data provided"});
        }
        let newQuestion = await Question.create({
            username_tutor: req.body.username_tutor,
            text: req.body.text
        })
        return res.status(201).json({ success: true, message: 'Question created.', id: newQuestion.id })
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

exports.answer = async (req, res) => {
    try{
        if(!req.body || !req.body.username_psychologist || !req.body.answer){
            return res.status(400).json({ success: false, msg: "Not enough data provided"});
        }
        let question = await Question.findOne({ where: { id: req.params.id }})
        if(question === 'undefined'){
            return res.status(404).json({ success: false, msg: "Question not found" });
        }
        await Question.update({
            username_psychologist: req.body.username_psychologist,
            answer: req.body.answer
        }, { where: { id: question.dataValues.id } })
        question = await Question.findOne({ where: { id: req.params.id }})
        return res.status(200).json({ succes: true, message: 'Answer was successfully added', question: question })
    }
    catch(err){
        if(err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.getOne = async (req, res) => {
    try{
        let question = await Question.findOne({ where: { id: req.params.id } });
        if(question == 'undefined'){
            return res.status(404).json({ success: false, msg: "Question not found" });
        }
        return res.status(200).json({ success: true, msg: 'Question found', question: question});
    }
    catch(err){
        if(err instanceof ValidationError)
            res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}
