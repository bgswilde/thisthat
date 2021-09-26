const router = require('express').Router();

// all routes will now how prefix of /api
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

/*router.use((req,res) => {
    res.status(404).end();
});*/

module.exports = router;