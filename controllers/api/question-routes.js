const router = require('express').Router();
const sequelize = require('../../config/connection');
const {User, Question, Choice } = require('../../models');

// get all question
// router.get('/', (req,res) => {
//     Question.findAll({
//         // order: [['created_at', 'DESC']],
//         attributes: [
//             'id',
//             'this_true',
//             'that_false'
//             [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.id)`), 'answer_count']],
//         include: [
//                 // {
//                 //     model: Choice,
//                 //     attributes: ['id','this_true','this_false'],
//                 //     include: {
//                 //         model: User,
//                 //         attributes: ['username']
//                 //     }
//                 // }
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//         ]
//     })
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

router.get('/', (req,res) => {
    Question.findAll({
        attributes: [
            'id','this_true','that_false',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id)`), 'answer_count'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = true)`), 'answered_true'],
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.question_id AND choice.choice = false)`), 'answered_false']
        ],
        include: [
            {
                model: Choice,
                attributes: ['question_id','user_id','choice'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

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

// choice route
router.put('/choice', (req,res) => {
    // to only allow loged in user then we can add if(req.session) and pull all this conde inside
    Choice.create({
        user_id: req.body.user_id,
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