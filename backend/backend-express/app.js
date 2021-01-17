const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();
const db = require("./db");


const dbHelpers = require('./helpers/dbHelpers.js')(db);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter(dbHelpers));
app.use('/trips', tripsRouter(dbHelpers));
app.use('/messages', messagesRouter(dbHelpers));

module.exports = app;
