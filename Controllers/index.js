// connection for server
const router = require('express').Router();
// declare API route folder
const apiRoutes = require('./api');
// homepage route
const homeRoutes = require('./homeRoutes.js');
// dashboard route
const dashboardRoutes = require('./dashboardRoutes.js');

// api path for server
router.use('/api', apiRoutes);

// homepage path
router.use('/', homeRoutes);

// dashboard path
router.use('/dashboard', dashboardRoutes);

// wildcard
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;
