const router   = require('express').Router();
const passport = require('passport');
const User     = require('../models/User');

// Show login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Process login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/login'
  })
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

// (Optional) Show registration form
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// (Optional) Process registration
router.post('/register', async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

module.exports = router;
