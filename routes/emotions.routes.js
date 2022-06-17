const express = require('express');

const emotionsController = require('../controllers/emotions.controller.js');
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
    .get(authController.verifyToken, emotionsController.getAll)
    .post(mutlerUploads, authController.verifyToken, emotionsController.create)

router.route('/:id')
    .get(emotionsController.getOne)
    .patch(authController.verifyToken, emotionsController.changeEmotion);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;