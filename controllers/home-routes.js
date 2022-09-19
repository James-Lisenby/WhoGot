const router = require('express').Router();
const { withAuth }  = require('../utils/auth');
const { Exception } = require('handlebars');
const { User, Event, Item } = require('../models');

// Route "/" renders all of events related to logged in user and show: name, date, place, and host of event
router.get('/', withAuth, async (req, res) => {

  try {
    debugger;
    const loggedInUser = req.session.user_id;

    // find all events WHERE LOGGED-USER is host
    const userEventData = await Event.findAll({
      where: {
        host_user_id: loggedInUser,
      },
      //eager loading includes associated items and the users associated with those items
      include: {
        model: User,
        attributes: { exclude: ['password'] },
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

    //store if they are new user
    let eventsExist = true;
    if(userEvents.length < 1) {
      eventsExist = false;
      res.render('homepage', {
        eventsExist,
        loggedInUser,
        userEvents,
        logged_in: req.session.logged_in,
      });
    } else {
    console.log(eventsExist);

    // we need lots of middleware to transform this data and do little conditionals like "is user bringing items to event"

    // need to add conditionals in handlebars to test if we should render various object properties such as items user is bringing to event if they are bringing any
    
    console.log(userEvents);

    res.render('homepage', {
      eventsExist,
      loggedInUser,
      userEvents,
      logged_in: req.session.logged_in,
    });
  }

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



// single event view GET route
router.get('/event/:id', withAuth, async (req, res) => {

  try {

    // the url for a given event page will be set in the event handler where it sends the user to a new page which will be "/:id"
    const viewedEventId = req.params.id;

    console.log(viewedEventId);

    // find event with id that matches /:id param in url
    const viewedEventData = await Event.findByPk(viewedEventId, {
      include: [{
        model: Item, 
        include: {
          model: User,
          attributes: { exclude: ['password'] },
        }
      }, 
      { model: User }],
    });

    // //serializes data
    const viewedEvent = viewedEventData.get({ plain: true });

    console.log(`THIS IS VIEWED EVENT: ${viewedEvent}`);

    res.render('view_event', {
      viewedEvent,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route "/new-event"
router.get('/new-event', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('create_event');
});



// //send a new user to /new-user
// router.get('/new-user', withAuth, (req, res) => {

//   res.render('new_user');
// });


// find all events WHERE LOGGED-USER is host
router.get('/', withAuth, async (req, res) => {
  try {
    const loggedInUser = req.session.user_id;
    const userEventData = await Event.findAll({
      where: {
        host_user_id: loggedInUser,
      },
    });

    // serializes data
    const userEvents = userEventData.map((userEvent) =>
      userEvent.get({ plain: true })
    );
    console.log(userEvents[0].id);
    res.render('homepage', {
      loggedInUser,
      userEvents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/new-event', withAuth, async (req, res) => {
  try {
    const loggedInUser = req.session.user_id;
    const newUserData = await User.findByPk(loggedInUser);
    const newEvents = newUserData.toJSON();

    res.render('create_event', {
      loggedInUser,
      newEvents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;