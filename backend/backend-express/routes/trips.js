const express = require('express');
const router = express.Router();

module.exports = ({
    getTrips,
    getTripById,
    addTrip,
    getTripsByNotAccepted,
    acceptTrip,
    cancelTrip, 
    deleteTrip
}) => {
    // GET all trips
    router.get('/', (req, res) => {
        getTrips()
            .then(trips => res.json(trips))
            .catch(err => res.json({
                error: err.message
            }));
    });

    // Get trip by accepted status
    router.get('/not-accepted', (req, res) => {
        getTripsByNotAccepted()
            .then(trips => res.json(trips))
            .catch(err => res.json({
                error: err.message
            }));
    });

    // Get trip by ID
    router.get('/:id', (req, res) => {
      const tripId = req.params.id;
      getTripById(tripId)
          .then(users => res.json(users))
          .catch(err => res.json({
              error: err.message
          }));
    });

    // POST a new trip
    router.post('/', function(req, res) {
      const {
        customer_id,
        driver_id,
        start_address,
        end_address,
        start_location_lat,
        start_location_lon,
        end_location_lat, 
        end_location_lon
      } = req.body;

      addTrip(customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon)
        .then(trip => res.json(trip))
        .catch(err => res.json({
            error: err.message
        }));
    });

    // Updates a trip to 'accepted'
    // NEED TO ADD driver_id somehow
    router.put('/:id/accept', (req, res) => {
        const tripId = req.params.id;
        // console.log(tripId);
        // const driverId = req.params.driver_id;
        // console.log(driverId)

        acceptTrip(tripId)
            .then(trip => res.json(trip))
            .catch(err => res.json({
                error: err.message
            }));
      });

      // Updates a trip to 'cancelled'
      router.put('/:id/cancel', (req, res) => {
        const tripId = req.params.id;

        cancelTrip(tripId)
            .then(trip => res.json(trip))
            .catch(err => res.json({
                error: err.message
            }));
      });

    router.put("/:id/cancel", (req, res) => {
      db.query(`UPDATE `, [req.params.id])
        .then(() => res.json("trip updated!"));
    });

    router.delete("/:id/delete", (req, res) => {
        const tripId = req.params.id;
        deleteTrip(tripId)
        .then(trip => res.json(trip))
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
