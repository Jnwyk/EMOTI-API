const express = require('express');

const childController = require('../controllers/children.controller.js');
const authController = require('../controllers/auth.controller.js');

const emotionStatsRouter = require('../routes/emotion_stats.routes.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .post(childController.create)
    .patch(authController.verifyToken, childController.changePassword);

router.route('/:id')
    .get(authController.verifyToken, childController.getOne)

router.use('/:idC/emotion_stats', emotionStatsRouter);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;