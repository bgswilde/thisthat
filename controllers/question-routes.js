const sequelize = require('../config/connection')
const router = require('express').Router();
const { Choice, Question, User } = require('../models');

router.get('/', (req,res) => {
    Question.findAll({
        attributes: [
            'id','this_true','that_false',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
        ]
    })
    .then(dbQuestionData => {
        const questions = dbQuestionData.map(question => question.get({ plain: true }));
        // console.log(dbQuestionData);
        // console.log(questions);
        res.render('questions', {
            questions,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
    

router.get('/:id', (req,res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id','this_true','that_false',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
        ],            
        include: [
            {
                model: Choice,
                attributes: [
                    'question_id','user_id','choice'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(singleQuestionData => {
        // console.log(singleQuestionData)
        if (!singleQuestionData) {
          res.status(404).json({ message: 'No question found with this id' });
          return;
        }
  
        const question = singleQuestionData.get({ plain: true });
        console.log(question)

        // console.log(singleQuestionData[0])
        res.render('single-question', {
            question
            // loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// router.get('/questions/:id', (req, res) => {
//     res.render('questions', {
//         loggedIn: req.session.loggedIn
//     });
// });


module.exports = router;