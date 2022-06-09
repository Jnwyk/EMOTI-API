const express = require('express');

const questionController = require('../controllers/questions.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(questionController.getAll)
    .post(questionController.create)

router.route('/:id')
    .get(questionController.getOne)
    .patch(questionController.answer);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;