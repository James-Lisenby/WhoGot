const { Event } = require('../../models');
const { withAuthApi } = require('../../utils/auth');

const router = require('express').Router();

router.post('/', withAuthApi, async (req, res) => {
    try {
        const createdEvent = await Event.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.json(createdEvent);
    }catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
    }
);



module.exports = router; 