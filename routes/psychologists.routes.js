const express = require('express');

const psychologistsController = require('../controllers/psychologists.controller.js');
const authController = require('../controllers/auth.controller.js');

const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now())
    }
});

const mutlerUploads = multer({storage}).single('image');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(psychologistsController.getAll)
    .post(mutlerUploads, psychologistsController.create)
    .patch(authController.verifyToken, psychologistsController.changePassword);

router.route('/:id')
    .get(authController.verifyToken, psychologistsController.getOne)

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;