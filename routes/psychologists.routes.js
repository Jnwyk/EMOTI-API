const express = require('express');

const psychologistsController = require('../controllers/psychologists.controller.js');
const authController = require('../controllers/auth.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(psychologistsController.getAll)
    .post(psychologistsController.create)
    .patch(authController.verifyToken, psychologistsController.changePassword);

router.route('/:id')
    .get(authController.verifyToken, psychologistsController.getOne)
    .delete(authController.verifyToken, psychologistsController.deleteOne);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;