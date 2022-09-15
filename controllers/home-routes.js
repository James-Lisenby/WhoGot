const router = require('express').Router();
const { User, Event, Item } = require('../models');
const withAuth = require('../utils/auth');

// Route "/" renders all of events related to logged in user and show: name, date, place, and host of event
router.get('/', withAuth, async (req, res) => {
  try {

    const loggedInUser = req.session.user_id;

    // find all events WHERE LOGGED-USER is host
    const hostedEventData = await Event.findAll({
      where: {
        host_user_id: loggedInUser
      }
    });
    //serializes data
    const hostedEvents = hostedEventData.map((hostedEvent) => hostedEvent.get({ plain: true }));


    // FIXME grab the whole event object for these items rather than just the item
    // find all events WHERE LOGGED-USER has claimed an item
    const claimedItemData = await Item.findAll({
      where: {
        user_id: loggedInUser
      }
    });
    //serializes data
    const claimedItems = claimedItemData.map((claimedItem) => claimedItem.get({ plain: true }));

    res.render('homepage', {
      loggedInUser,
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