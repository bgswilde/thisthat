const router = require('express').Router();
const { Choice, Question, User } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;