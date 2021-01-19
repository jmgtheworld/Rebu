const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');

const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();
const db = require("./db");

const dbHelpersUsers = require('./helpers/dbHelpersUsers.js')(db);
const dbHelpersTrips = require('./helpers/dbHelpersTrips.js')(db);
const dbHelpersMessages = require('./helpers/dbHelpersMessages.js')(db);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use('/users', usersRouter(dbHelpersUsers));
app.use('/trips', tripsRouter(dbHelpersTrips));
app.use('/messages', messagesRouter(dbHelpersMessages));
app.use('/login', usersRouter(dbHelpersUsers));

module.exports = app;
