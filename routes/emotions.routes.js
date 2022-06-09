const express = require('express');

const emotionsController = require('../controllers/emotions.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(authController.verifyToken, emotionsController.getAll)
    .post(authController.verifyToken, emotionsController.create)
    .put(authController.verifyToken, emotionsController.changeEmotion);

router.route('/:id')
    .get(emotionsController.getOne);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;