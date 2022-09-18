const router = require('express').Router();
const userRoutes = require('./user-routes');
const newEventRoute = require('./new-event-route');

router.use('/users', userRoutes);
router.use('/new-event', newEventRoute);

module.exports = router;
