const express = require('express');

const tutorController = require('../controllers/tutors.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(tutorController.getAll)
    .post(tutorController.create)
    .put(tutorController.changePassword);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;