const express = require('express');

const psychologistsController = require('../controllers/psychologists.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(psychologistsController.getAll)
    .post(psychologistsController.create)
    .put(authController.verifyToken, psychologistsController.changePassword);

// router.route('/login')
//     .post(psychologistsController.login);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;