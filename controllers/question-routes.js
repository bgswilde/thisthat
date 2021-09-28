const router = require('express').Router();
const { Choice, Question, User } = require('../models');

router.get('/questions', (req, res) => {
    res.render('questions', {
        loggedIn: req.session.loggedIn
    });
});


module.exports = router;