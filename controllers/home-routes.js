const router = require('express').Router();
const { User, Event, Item } = require('../models');
const withAuth = require('../utils/auth');
const connection = require('../config/connection');

// Route "/" renders all of events related to logged in user and show: name, date, place, and host of event
router.get('/', withAuth, async (req, res) => {
  try {

    // find all events WHERE LOGGED-USER is host
    const hostedEventData = await Event.findAll({
      
      where: {
        // host_user_id === logged in user
        host_user_id: req.session.user_id
      }
    });

    const hostedEvents = hostedEventData.map((hostedEvent) => hostedEvent.get({ plain: true }));


      // find all events WHERE LOGGED-USER is host or has claimed an item
      const claimedItemData = await Event.findAll({
      
        where: {
          // host_user_id === logged in user || where claimed_user_id === logged in user
          host_user_id: req.session.user_id
        }
      });
  
      const claimedItems = claimedItemData.map((claimedItem) => claimedItem.get({ plain: true }));

    res.render('homepage', {
      hostedEvents,
      claimedItems,
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

// POST Route "/event/:id" - 

// POST Route "event/new" - POSTs new event data from form to whogot_db



module.exports = router;