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
            // [sequelize.literal(`(SELECT * FROM choice WHERE choice.choice = true )`), 'answered_true'],
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
        console.log(userChoices[0].choice);
        // console.log(userChoices[0].question.this_true);
        // console.log(userChoices[0].question.that_false);
        // console.log(userChoices[0].question.answered_true);

        res.render('dashboard', {
            userChoices
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// router.get('/', auth, (req, res) => {
//     res.render('dashboard', {
//         loggedIn: req.session.loggedIn,
//         username: req.session.username
//     });
// });


module.exports = router;