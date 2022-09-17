const router = require('express').Router();
const userRoutes = require('./user-routes');
const newEventRoute = require('./new-event-route');
//const newItemRoute = require('./new-item-route');

router.use('/users', userRoutes);
router.use('/new-event', newEventRoute);
//router.use('/event:id', newItemRoute);

module.exports = router;
