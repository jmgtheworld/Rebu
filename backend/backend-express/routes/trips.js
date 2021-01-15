// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   db.query(
//     "SELECT * FROM trips"
//   ).then(({ rows: trips }) => {
//     res.json(trips);
//   });
// });

// router.get('/:id', function(req, res) {
//   db.query(
//     `SELECT * FROM trips WHERE id=$1`
//   , [req.params.id]).then(({ rows: trip }) => {
//     res.json(trip);
//   });
// });

// router.post('/', function(req, res) {
//   const {
//     user_id,
//     start_address,
//     end_address,
//     start_location_lat,
//     start_location_lon,
//     end_location_lat, 
//     end_location_lon,
//     payment_amount,
//     payment_status
//   } = req.body;

//   db.query(
//     `
//     INSERT INTO users (
//       user_id,
//       start_address,
//       end_address,
//       start_location_lat,
//       start_location_lon,
//       end_location_lat, 
//       end_location_lon,
//       payment_amount,
//       payment_status)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     `
//   , [user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat,end_location_lon, payment_amount, payment_status])
//     .then(() => res.json("added trip!"));
// });

// router.put("/:id/cancel", (req, res) => {
//   db.query(`UPDATE `, [req.params.id])
//     .then(() => res.json("trip updated!"));
// });


// module.exports = router;

const express = require('express');
const router = express.Router();

module.exports = ({
    getTrips
}) => {
    /* GET all trips */
    router.get('/', (req, res) => {
        getTrips()
            .then((trips) => res.json(trips))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/', function(req, res) {
      const {
        user_id,
        start_address,
        end_address,
        start_location_lat,
        start_location_lon,
        end_location_lat, 
        end_location_lon,
        payment_amount,
        payment_status
      } = req.body;

      db.query(
        `
        INSERT INTO users (
          user_id,
          start_address,
          end_address,
          start_location_lat,
          start_location_lon,
          end_location_lat, 
          end_location_lon,
          payment_amount,
          payment_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `
      , [user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat,end_location_lon, payment_amount, payment_status])
        .then(() => res.json("added trip!"));
    });

    router.put("/:id/cancel", (req, res) => {
      db.query(`UPDATE `, [req.params.id])
        .then(() => res.json("trip updated!"));
    });

    return router;
};