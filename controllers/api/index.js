const router = require('express').Router();

const userRoutes = require('./user-routes');

// all routers will have /users prefix
router.use('/users', userRoutes);


module.exports = router;