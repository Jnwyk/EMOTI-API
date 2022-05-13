const express = require('express');
// const { TimeoutError } = require('sequelize/types');

const questionController = require('../controllers/questions.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(questionController.getAll)
    .post(questionController.create)
    .put(questionController.answer);

router.route('/:id')
    .get(questionController.getOne);

router.all('*', (req, res) => {
    res.status(404).json({message: 'page questions not found'});
})

module.exports = router;