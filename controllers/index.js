const router = require('express').Router();
// user-facing  such as homepage or login
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => { // this is incase the user requests an endpoint that doesn't exist
  res.status(404).end();
});

module.exports = router;