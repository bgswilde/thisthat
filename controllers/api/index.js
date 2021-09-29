const router = require('express').Router();

const userDbRoutes = require('./db-user-routes');
const questionDbRoutes = require('./db-question-routes');

// all user routes will have /users prefix
router.use('/users', userDbRoutes);
// all question routes will now have /questions prefix
router.use('/questions',questionDbRoutes);


module.exports = router;