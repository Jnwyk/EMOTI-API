const express = require('express');

const gameController = require('../controllers/games.controller.js');
const authController = require('../controllers/auth.controller.js');

const emotionsRouter = require('../routes/emotions.routes.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(gameController.getAll)
    .post(gameController.create);

// is this necessary?
router.route('/:id')
    .get(authController.verifyToken, gameController.getOne);

    // games/:id/questions

// How to deal with getting a few emotions?????
// router.use('/:idG/emotions', emotionsRouter);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;