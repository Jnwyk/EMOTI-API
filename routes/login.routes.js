const express = require('express');

const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .post(authController.login);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;