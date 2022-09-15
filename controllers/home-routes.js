const router = require('express').Router();
const { User, Event, Item } = require('../models');
const withAuth = require('../utils/auth');
const connection = require('../config/connection');

// Route "/" renders all of events related to logged in user and show: name, date, place, and host of event
router.get('/', withAuth, async (req, res) => {
  try {

    const loggedInUser = req.session.user_id;

    // find all events WHERE LOGGED-USER is host or has claimed an item
    const userEventData = await Event.findAll({
      
      where: {
        // host_user_id === logged in user || where claimed_user_id === logged in user
        host_user_id: loggedInUser
      }
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route "/login"

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// GET Route "/event/:id" - get a specific event from url

// POST Route "event/new" - POSTs new event data from form to whogot_db

// POST Route "/event/:id?chips=claim+tent=unclaim" - POSTs claim or unclaimed button clicks for the event


module.exports = router;