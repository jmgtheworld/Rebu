const express = require('express');
const router = express.Router();

module.exports = ({
    getUsers,
    getUserById,
    addUser
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

    // Add new user
    router.post('/add', (req, res)=> {
        const driver = req.body.license ? true : false;
        const { full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, postal_code, city, province, country, apartment_number } = req.body;

        addUser(driver, full_name, email, phone_number, credit_card,  month_year, cvc, license, street_address, postal_code, city, province, country, apartment_number)
            .then(user => res.json(user))
            .catch((err) => res.json({
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
