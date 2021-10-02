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
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userChoices
        });
        // if(userChoices.length>0){
        //     res.render('dashboard', {
        //         userChoices
        //     });
        // } else if(userChoices.length === 0){
        //     res.render('empty-dashboard', {
        //         userChoices
        //     });
        // }

        // console.log(userChoices[0]);
        // // console.log(userChoices);
        // // console.log(typeof userChoices);
        // console.log(userChoices.length);
        
        
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