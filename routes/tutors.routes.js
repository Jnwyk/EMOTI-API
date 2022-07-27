const express = require('express');

const tutorController = require('../controllers/tutors.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .post(tutorController.create)
    .patch(authController.verifyToken, tutorController.changePassword);


router.route('/:id')
    .get(authController.verifyToken, tutorController.getOne)
    .delete(authController.verifyToken, tutorController.deleteOne);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;