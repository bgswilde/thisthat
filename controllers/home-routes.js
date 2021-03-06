const sequelize = require('../config/connection')
const router = require('express').Router();
const { Choice, Question, User } = require('../models');


router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/create', (req, res) => {
    res.render('create-question');
});

router.get('/end', (req, res) => {
    res.render('end', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;