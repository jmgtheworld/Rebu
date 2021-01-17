const { response } = require('express');
const express = require('express');
const router = express.Router();

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

    router.post('/:id/location', (req, res) => {
        const userId = req.params.id;
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
        const { full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password } = req.body;
        const current_location_lat = null; 
        const current_location_lon = null;

        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(driver, full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password)
                }

            })
            .then(newUser => res.json(newUser))
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
