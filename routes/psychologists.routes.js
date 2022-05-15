const express = require('express');

const psychologistsController = require('../controllers/psychologists.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(psychologistsController.getAll)
    .post(psychologistsController.create)
    .put(psychologistsController.changePassword);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;