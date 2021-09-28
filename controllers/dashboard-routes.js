const router = require('express').Router();
const { Choice, Question, User } = require('../models');

router.get('/', (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
});


module.exports = router;