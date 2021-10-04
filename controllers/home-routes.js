const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/create', (req, res) => {
    res.render('create-question', {
        loggedIn: req.session.loggedIn
    });
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