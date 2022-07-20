const express = require('express');

const emotionsController = require('../controllers/emotions.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(authController.verifyToken, emotionsController.getAll)
    .post(authController.verifyToken, emotionsController.create)

router.route('/:id')
    .get(emotionsController.getOne)
    .patch(authController.verifyToken, emotionsController.changeEmotion);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;