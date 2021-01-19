const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = ({
  getUsers,
  getUserById,
  addUser,
  getUserByEmail,
  getTripsByUserId,
  updateUserCurrentLocation,
  fetchIP,
  fetchCoordsByIP
}) => {



  return router;
};