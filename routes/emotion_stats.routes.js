const express = require('express');

const emotionStatsController = require('../controllers/emotion_stats.controller.js');

let router = express.Router({mergeParams: true})

router.route('/')
    .get(emotionStatsController.findAll);

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})


module.exports = router;