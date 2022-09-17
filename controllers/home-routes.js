const router = require('express').Router();

const { User } = require('../models');
const { withAuth }  = require('../utils/auth');
const { Exception } = require('handlebars');
const { User, Event, Item } = require('../models');
const withAuth = require('../utils/auth');


// Route "/" renders all of events related to logged in user and show: name, date, place, and host of event
router.get('/', withAuth, async (req, res) => {

  try {

    const loggedInUser = req.session.user_id;

    // find all events WHERE LOGGED-USER is host
    const userEventData = await Event.findAll({
      where: {
        host_user_id: loggedInUser,
      },
      //eager loading includes associated items and the users associated with those items
      include: {
        model: User,
        include: {
          model: Item,
          include: {
            model: Event
          }
        }
      }
    });
    //serializes data
    const userEvents = userEventData.map((userEvent) => userEvent.get({ plain: true }));

    // we need lots of middleware to transform this data and do little conditionals like "is user bringing items to event"

    // need to add conditionals in handlebars to test if we should render various object properties such as items user is bringing to event if they are bringing any
    
    console.log(userEvents);
    console.log(userEvents[1].user.items);
    console.log(userEvents[1].user.items[1].event);

    res.render('homepage', {
      loggedInUser,
      userEvents,
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




router.get('/user-events', withAuth, async (req, res) => {

  const userData = await User.findByPk(req.session.user_id, {
    attributes: ['id', 'username'],
    include: Event
  });

  const user = userData.toJSON();

  console.log(user);

  res.render('user-events', {
    user,
    logged_in: req.session.logged_in,
  })
});
// Once the handlebars for the user events page is made, this route will be used to get all events associated to the logged in user.


module.exports = router;


// Route "/events" - GETS all events associated with user
//// GETS hosted events
//// GETS attendee events

// POST Route "/signup" - posts a new user to Users.js


// GET Route "/event/:id" - get a specific event from url

// POST Route "/event/:id" - 

// POST Route "event/new" - POSTs new event data from form to whogot_db



module.exports = router;