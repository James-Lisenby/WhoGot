const router = require('express').Router();
const { User } = require('../models');
const { withAuth }  = require('../utils/auth');

// Route "/"

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
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

// GET Route "/event/:id" - get a specific event from url

// POST Route "event/new" - POSTs new event data from form to whogot_db

// POST Route "/event/:id?chips=claim+tent=unclaim" - POSTs claim or unclaimed button clicks for the event