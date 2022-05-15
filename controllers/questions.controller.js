const db = require("../models/index.js");
const Question = db.question;

exports.getAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Questions successfully retrieved.'})
}

exports.create = async (req, res) => {
    res.status(201).json({ success: true, message: 'Question created.', ID: 'question.id' })
}

exports.answer = async (req, res) => { 
    res.status(200).json({ succes: true, message: 'Answer was successfully added.'})
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'Question was found', ID: 'question.id'})
}
