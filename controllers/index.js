const router = require('express').Router();
// user-facing  such as homepage or login
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => { // this is incase the user requests an endpoint that doesn't exist
  res.status(404).end();
});

module.exports = router;