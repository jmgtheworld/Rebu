module.exports = (db) => {
    // Gets all trips in DB
    const getTrips = () => {
      const query = {
          text: 'SELECT * FROM trips',
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
    // NEED TO ADD driver_id somehow
    const acceptTrip = (tripId) => {
        const query = {
            text: `UPDATE trips SET accepted = TRUE WHERE id = $1`,
            values: [tripId]
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
  
    return {
        getTrips,
        getTripById,
        addTrip,
        getTripsByNotAccepted,
        acceptTrip,
        cancelTrip
    };
  };