const { json } = require('express');
const { JSON } = require('sequelize');
const { Event } = require('../../models');
const { withAuthApi } = require('../../utils/auth');

const router = require('express').Router();

router.post('/', withAuthApi, async (req, res) => {
    try {
        debugger;
        console.log("new event POST req recieved");
        const createdEvent = await Event.create({
            ...req.body,
            host_user_id: req.session.user_id,
        });
        debugger;
        res.status(200).json(createdEvent);
        debugger;
    }catch (err) {
        debugger;
        console.log(err);
        debugger;
        res.status(500).json(err)
    }
    }
);



module.exports = router; 

// Will be the post route to create a new event. Still in progress.

// POST Route

// Recieves JSON data from client POST req

// Creates new Event instance with properties from JSON req converted to db form

// sends OK response