const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const User          = require('../models/User');

module.exports = function(passport) {
  // Configure the local strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // How to store user data in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // How to get user data out of session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
