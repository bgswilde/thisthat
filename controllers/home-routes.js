const sequelize = require('../config/connection')
const router = require('express').Router();
const { Choice, Question, User } = require('../models');

router.get('/questions', (req,res) => {
    Question.findAll({
        attributes: [
            'id','this_true','that_false',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
        ]
        // include: [
        //     {
        //         model: Choice,
        //         attributes: ['question_id','user_id','choice']
        //         // include: {
        //         //     model: User,
        //         //     attributes: ['username']
        //         // }
        //     }
        // ]
    })
    .then(dbQuestionData => {
        const questions = dbQuestionData.map(question => question.get({ plain: true }));
        res.render('questions', {
            questions,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get('/', (req, res) => {
    res.render('homepage', {
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

router.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
module.exports = router;