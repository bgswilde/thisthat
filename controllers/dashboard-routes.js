const router = require('express').Router();
const { Choice, Question, User } = require('../models');
const auth = require('../utils/authorize')

router.get('/', auth, (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
});


module.exports = router;