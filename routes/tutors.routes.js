const express = require('express');

const tutorController = require('../controllers/tutors.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(tutorController.getAll)
    .post(tutorController.create)
    .patch(authController.verifyToken, tutorController.changePassword);


// router.route('/login')
//     .post(tutorController.login);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;