const db = require("../models/index.js");
const Game = db.game;

exports.getAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Games successfully retrieved'})
}

exports.create = async (req, res) => {
    res.status(201).json({ success: true, message: "New game created.", game: 'name' })
    res.status(201).json({ message: "Game added.", URL: '/game/:id' })
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'Game was found', game: 'name'})
}
