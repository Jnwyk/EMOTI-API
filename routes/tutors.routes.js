const express = require('express');

const tutorController = require('../controllers/tutors.controller.js');
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
    .post(mutlerUploads, tutorController.create)
    .patch(authController.verifyToken, tutorController.changePassword);


router.route('/:id')
    .get(authController.verifyToken, tutorController.getOne)

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;