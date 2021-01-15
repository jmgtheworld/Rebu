const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//need cors??

const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');

const app = express();
const db = require("./db");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter(db));
app.use('/trips', tripsRouter(db));

module.exports = app;
