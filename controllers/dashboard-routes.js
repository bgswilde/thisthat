const sequelize = require('../config/connection');
const router = require('express').Router();
const { Choice, Question, User } = require('../models');
const auth = require('../utils/authorize')

// get all choice from specific user that is logged in
router.get('/', (req, res) => {
    Choice.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'choice',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
        ],
        include: [
            {
                model: Question,
                attributes: ['this_true', 'that_false'],
            }
        ]
    })
    .then(dbChoiceData => {
        const userChoices = dbChoiceData.map(choice => choice.get({ plain: true }));
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userChoices
        });
        console.log(userChoices[0] + 'DASHBOARD-ROUTES.JS');
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;