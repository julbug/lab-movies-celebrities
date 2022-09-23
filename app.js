// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

//==========================================
const session = require('express-session');
const MongoStore = require('connect-mongo');
//==========================================

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here

app.use(
    session({
      secret: '123secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 600000
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/expressApp'
      })
    })
  );
  
  
  app.use(function (req, res, next) {
    // im making a template variable called theUser and imequalling it to 
    // the user object in the session
    res.locals.theUser = req.session.currentlyLoggedIn;
    next();
  })

const index = require('./routes/index');
app.use('/', index);

const Celebrities = require('./routes/celebrities.js');
app.use('/', Celebrities);

const Movies = require('./routes/movies.js');
app.use('/', Movies);

const User = require('./routes/authroutes.js');
app.use('/', User);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
