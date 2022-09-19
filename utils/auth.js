const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    debugger;
    res.redirect('/login');
  } else {
    console.log(req.session.user_id);
    debugger;
    next();
  }
};

const withAuthApi = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ message: 'You are not authorized to do that' });
  } else {
    next();
  }
};

const withNoAuth = (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = {
  withAuth,
  withAuthApi,
  withNoAuth,
};

// Added the addiontanl const's.
