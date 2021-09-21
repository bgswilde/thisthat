const router = require('express').Router();
const { User } = require('../../models');

// get all users 
router.get('/', (req,res) => {
    User.findAll({
         // this makes sure we don't see user password
         attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get single user
router.get('/:id', (req,res) => {
    User.findOne({
        // this makes sure we don't see user password
        attributes: { exclude: ['password']},
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

// create a user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    })
});

// update user
router.put('/', (req,res) => {
    User.update(req.body, {
        // req.body means to only update what is being passed through
        individualHooks: true,
        where: {
            id: req.params.id
        }
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


// delete a user
router.delete('/', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
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