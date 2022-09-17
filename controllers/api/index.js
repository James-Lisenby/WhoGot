const router = require('express').Router();
const userRoutes = require('./user-routes');
const newEventRoute = require('./user-routes');
const newItemRoute = require('./user-routes');

router.use('/users', userRoutes);
router.use('/new-', newEventRoute);
router.use('/users', newItemRoute);

module.exports = router;
