const { ValidationError } = require("sequelize");
const db = require("../models/index.js");
const Game = db.game;

exports.create = async (req, res) => {
    try{
        if(!req.body || !req.body.name || !req.body.description){
            return res.status(400).json({ success: false, msg: 'Not enough data provided' })
        }
        let newGame = await Game.create({
            name: req.body.name,
            description: req.body.description
        });
        return res.status(201).json({ success: true, msg: "New game created", id: newGame.id })
    }
    catch(err){
        if(err instanceof ValidationError){
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message)})
        }
        else{
            return res.status(500).json({ success: false, msg: err.message || "An error has occured"})
        }
    }
}

exports.getOne = async (req, res) => {
    try{
        if(!req.loggedUsername){
            return res.status(400).json({ success: false, msg: "User not logged in" });
        }
        let game = await Game.findOne({ where: { id: req.params.id } });
        if(game === 'undefined'){
            return res.status(400).json({ succes: false, msg: "Game not found" });
        }
        return res.status(200).json({ success: true, message: 'Game found', game: game });
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}
