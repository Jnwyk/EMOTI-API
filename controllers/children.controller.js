const db = require("../models/index.js");
const Child = db.child;

exports.getAll = async (req, res) => {
    res.status(200).json({ success: true, message: 'Child users successfully retrieved'})
}

exports.create = async (req, res) => {
    res.status(201).json({ success: true, message: "New user created.", username: 'username' })
    res.status(201).json({ message: "User added.", URL: '/child/username' })
}

exports.changePassword = async (req, res) => {
    res.status(200).json({ success: true, message: 'Password was successfully changed.'})
}

exports.getOne = async (req, res) => {
    res.status(200).json({ success: true, message: 'User was found', username: 'username'})
}

exports.login = async (req, res) => {
    
}
