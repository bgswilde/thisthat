const router = require('express').Router();

const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');

// all user routes will have /users prefix
router.use('/users', userRoutes);
// all question routes will now have /questions prefix
router.use('/questions',questionRoutes);


module.exports = router;