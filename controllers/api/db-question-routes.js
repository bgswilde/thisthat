const router = require('express').Router();
const sequelize = require('../../config/connection');
const {User, Question, Choice } = require('../../models');
// const auth = require('../../utils/authorize')

// get a count of all questions, to use as a max question filter so a user doesn't keep on going.
router.get('/count', (req, res) => {
    Question.count({}).then(dbQuestionCount => res.json(dbQuestionCount))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/', (req, res) => {
    Choice.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['choice'],
        include: [
            {
                model: Question,
                attributes: ['this_true', 'that_false']
            }
        ]
    })
    .then(choiceData => res.json(choiceData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});
        

// router.get('/', (req,res) => {
//     Question.findAll({
//         attributes: [
//             'id','this_true','that_false',
//             [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
//             [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
//             [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
//         ],
//         include: [
//             {
//                 model: Choice,
//                 attributes: ['question_id','user_id','choice'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             }
//         ]
//     })
//     .then(dbQuestionData => res.json(dbQuestionData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })

// get single question
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
    .then(dbQuestionData => {
        if(!dbQuestionData) {
            res.status(404).json({ message: 'no Question with that ID found'});
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// create aquestion
router.post('/', (req,res) => {
    Question.create({
       this_true: req.body.this_true,
       that_false: req.body.that_false 
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// create choice route
router.post('/choice', (req,res) => {
    // to only allow loged in user then we can add if(req.session) and pull all this conde inside
    Choice.create({
        user_id: req.session.user_id,
        question_id: req.body.question_id,
        choice: req.body.choice
    })
    .then(() => {
        // now find question that was answered
        return Question.findOne({
            where: {
                id: req.body.question_id
            },
            attributes: [
                'id','this_true','that_false',
                [
                    sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.id)`),
                    'answer_count'
                ]
            ]
        })
    })
    .then(dbChoiceData => res.json(dbChoiceData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

// update choice route
router.put('/choice/:id', (req,res) => {
    // to only allow loged in user then we can add if(req.session) and pull all this conde inside
    Choice.update(req.body,{
        where: {
            id: req.params.id,
        }
    })
    .then(dbChoiceData => res.json(dbChoiceData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});


// update question
router.put('/:id', (req,res) => {
    Question.update(req.body, {
        // req.body means to only update what is being passed through
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbQuestionData => {
        if(!dbQuestionData) {
            res.status(404).json({ message: 'no Question with that ID found'});
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// delete aquestion
router.delete('/:id', (req,res) => {
    Question.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbQuestionData => {
        if(!dbQuestionData) {
            res.status(404).json({ message: 'no Question with that ID found'});
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;