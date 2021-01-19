const { response } = require('express');
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
    // Get all users
    router.get('/', (req, res) => {
        console.log(req.session.user_id);
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // Get user by ID
    router.get('/:id', (req, res) => {
        const userId = req.params.id;
        getUserById(userId)
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // Login user
    // Sets session id to user id if successful
    router.post('/login', (req, res) => {
        const { email, password } = req.body;
        req.session.user_id = null;

        getUserByEmail(email)
            .then(user => {
                if (user) {
                    if (user.email === email) {
                        if (user.password === password) {
                            // send cookies here?
                            // req.cookies
                            req.session.user_id = user.id;
                            console.log("session id:", req.session.user_id );
                            // return res.json({"user_id": req.session.user_id});
                            console.log(user);
                            return res.json(user);
                        } else {
                            return res.json("Incorrect password");
                        }
                    } else {
                        return res.json("Incorrect email or password");
                    }
                } else {
                    return res.json("Email does not exist");
                }
            })
            .catch(err => res.json({
                error: err.message
            }));
    });

    // Logout
    // Set session id to null
    router.post('/logout', (req, res) => {
        req.session.user_id = null;
        return res.json(req.session.user_id);
    });

    router.put('/:id/location', (req, res) => {
        // changed from req.params.id
        const userId = req.session.user_id;
        // fetch the user's current IP
        return fetchIP()
            .then(body => {
                // Fetch the user's lat and lon from their IP
                fetchCoordsByIP(body)
                    .then(coordinates => {
                        // Update the user's current location with their new coordinates
                        const { lat, lon } = JSON.parse(coordinates);
                        updateUserCurrentLocation(lat, lon, userId)
                    })
            })
            .then(user => res.json(user))
            .catch(err => res.json({
                error: err.message
            }));
    });

    // Gets all of a user's trips
    router.get('/:id/trips', (req, res) => {
        const userId = req.params.id;
        getTripsByUserId(userId)
            .then(trips => res.json(trips))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // Add new user
    router.post('/', (req, res)=> {
        const driver = req.body.license ? true : false;
        const { full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password } = req.body;
        const current_location_lat = null; 
        const current_location_lon = null;

        getUserByEmail(email)
            .then(user => {
                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password)
                }

            })
            .then(newUser => {
                // Set the session id to the new user's id
                // console.log(newUser);
                // req.session.user_id = newUser.id;
                // return res.json({"user_id": req.session.newUser_id});
                res.json(newUser)
            })
            .catch(err => res.json({
                error: err.message
            }));
    });

    return router;
};

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   db.query(
//     "SELECT * FROM users"
//   ).then(({ rows: users }) => {
//     res.json(users);
//   });
// });

// router.get('/:id', function(req, res) {
//   db.query(
//     `SELECT * FROM users WHERE id=$1`
//   , [req.params.id]).then(({ rows: user }) => {
//     res.json(user);
//   });
// });

// router.post('/', function(req, res) {
//   const driver = req.body.license ? true : false
//   const { full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number } = req.body;

//   db.query(
//     `
//     INSERT INTO users (driver, full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//     `
//   , [driver, full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number]).then(() => {
//     res.json("added user!");
//   });
// });

// module.exports = router;
