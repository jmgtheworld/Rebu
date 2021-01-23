module.exports = (db) => {
    // Gets all trips in DB
    const getTrips = () => {
      const query = {
          text: 'SELECT * FROM trips ORDER BY created_at',
      };
  
      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
    };

    // Gets trip by ID
    const getTripById = id => {
        const query = {
            text: `SELECT * FROM trips WHERE id = $1` ,
            values: [id]
        };

        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    };

    // Get not accepted trips
    const getTripsByNotAccepted = () => {
        const query = {
            text: 'SELECT * FROM trips WHERE accepted = FALSE',
        };
    
        return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
      };

    // Add new trip to DB
    const addTrip = (customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon) => {
        const query = {
            text: `
            INSERT INTO trips (customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
            `,
            values: [customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon]
        };
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };

    // Updates a trip to 'accepted'
    const acceptTrip = (tripId, driverId) => {
        const query = {
            text: `UPDATE trips SET accepted = TRUE, driver_id = $2 WHERE id = $1`,
            values: [tripId, driverId]
        };

        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };

    // Updates a trip to 'cancelled'
    const cancelTrip = (tripId) => {
        const query = {
            text: `UPDATE trips SET accepted = FALSE, driver_id = null WHERE id = $1`,
            values: [tripId]
        };

        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };

    const deleteTrip = (tripId) => {
        const query = {
            text: `DELETE FROM trips WHERE id = $1`,
            values: [tripId]
        };

        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };

    const getUserAndDriverActiveTrip = (tripId) => {
        const query = {
            text: `
                SELECT 
                    trips.id,
                    trips.customer_id,
                    trips.driver_id,
                    trips.start_address,
                    trips.end_address,
                    trips.start_location_lat,
                    trips.start_location_lon,
                    trips.end_location_lat,
                    trips.end_location_lon,
                    trips.accepted,
                    trips.payment_amount,
                    trips.payment_status,
                    trips.created_at,
                    trips.ended_at,
                    customer.full_name AS customer_name,
                    driver.full_name AS driver_name 
                FROM trips
                    JOIN users customer ON trips.customer_id = customer.id
                    JOIN users driver ON trips.driver_id = driver.id
                WHERE accepted = TRUE
                AND ended_at IS NULL
                AND trips.id = $1
            `,
            values: [tripId],
        };

        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };              
  
    return {
        getTrips,
        getTripById,
        addTrip,
        getTripsByNotAccepted,
        acceptTrip,
        cancelTrip, 
        deleteTrip,
        getUserAndDriverActiveTrip
    };
  };