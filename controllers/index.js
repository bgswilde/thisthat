const router = require('express').Router();

// all routes will now how prefix of /api
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;