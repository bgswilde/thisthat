const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Question, Choice } = require('../../models');

// get all questions 
router.get('/', (req,res) => {
    Question.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'this_true',
            'this_false',
            'created_at',
            [sequelize.literal(`(SELECT COUNT(*) FROM choice WHERE question.id = choice.id)`, 'answer_count')]],
            include:[
                // {
                //     model: 
                // },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get single question
router.get('/:id', (req,res) => {
    Question.findOne({
        where: {
            id: req.params.id
        }
        // include: [
        //     {
        //         model: Post
        //     },
        //     {
        //         model: Comment
        //     }
        // ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'no User with that ID found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;