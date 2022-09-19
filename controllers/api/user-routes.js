const router = require('express').Router();
const { User, Event, Item } = require('../../models');
var validator = require("email-validator");
validator.validate("test@email.com");

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [{ model: Item }, { model: Event }],
//     });
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// CREATE new user
router.post('/', async (req, res) => {
  try {
    validator.validate('test@email.com');
    const emailIsValid = validator.validate(req.body.email);
    console.log(emailIsValid);
    debugger;

    if (emailIsValid) {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("dbUserData created");
      console.log(dbUserData);
      console.log(typeof dbUserData);
      debugger;
  

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
      debugger;

    });
  } else {
    console.error("invalid email");
    debugger;
  }
  debugger;

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    debugger;
  }
  debugger;

});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
