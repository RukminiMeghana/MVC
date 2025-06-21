require('dotenv').config();
const express   = require('express');
const path      = require('path');
const session   = require('express-session');
const passport  = require('passport');

// 1) Passport config (local strategy in config/passport.js)
require('./config/passport')(passport);

// 2) Sequelize & models
const sequelize = require('./models');       // models/index.js
require('./models/Event');                  // registers the Event model
require('./models/User');                   // registers the User model

// 3) Routers
const authRoutes  = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

// 4) View engine & static files
app.set('view engine', 'ejs');
app.set('views',      path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 5) Body parser
app.use(express.urlencoded({ extended: true }));

// 6) Sessions & Passport init
app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 7) Authentication routes (login, logout, register)
app.use('/', authRoutes);

// 8) Auth guard for everything under /events
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
app.use('/events', ensureAuthenticated, eventRoutes);

// 9) Root route: redirect to events or login
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/events');
  }
  res.redirect('/login');
});

// 10) Sync DB & start server
sequelize.sync()
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
  });
