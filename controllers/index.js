// import package and local modules
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// define route path
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
