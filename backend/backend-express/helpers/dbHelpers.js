module.exports = (db) => {
    // Gets all users in DB
    const getUsers = () => {
        const query = {
            text: 'SELECT * FROM users',
        };
  
        return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };

    // Get user by ID
    const getUserById = id => {
        const query = {
            text: `SELECT * FROM users WHERE id = $1` ,
            values: [id]
        };

        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    };

    const getTripsByUserId = id => {
        const query = {
            text: `SELECT * FROM trips WHERE customer_id = $1`,
            values: [id]
        };

        return db
            .query(query)
            .then(result => result.rows)
            .catch((err) => err);
    };

    // const getUserCurrentLocation = id => {

    // };

    // Add new user to DB
    const addUser = (driver, full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password) => {
        const query = {
            text: `
                INSERT INTO users (driver, full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            `,
            values: [driver, full_name, email, created_at, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password]
        };
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };

    const getUserByEmail = email => {

        const query = {
            text: `SELECT * FROM users WHERE email = $1` ,
            values: [email]
        }

        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    }
  
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

    const addTrip = (user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon, payment_amount, payment_status) => {
        const query = {
            text: `
            INSERT INTO users (user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon, payment_amount, payment_status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
            values: [user_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat,end_location_lon, payment_amount, payment_status]
        };
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };
  
    // Gets all messages in DB
    const getMessages = () => {
        const query = {
            text: 'SELECT * FROM messages',
        };
    
        return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };

    // Gets message by ID
    const getMessageById = id => {
        const query = {
            text: `SELECT * FROM messages WHERE id = $1` ,
            values: [id]
        };
    
        return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
    };

  
    // Sample code, can be modified later
    // const getUsersPosts = () => {
    //     const query = {
    //         text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
    //     FROM users
    //     INNER JOIN posts
    //     ON users.id = posts.user_id`
    //     }
  
    //     return db.query(query)
    //         .then(result => result.rows)
    //         .catch(err => err);
  
    // }
  
    return {
        getUsers,
        getUserById,
        addUser,
        getUserByEmail,
        getTrips,
        getTripById,
        addTrip,
        getMessages,
        getMessageById,
        getTripsByUserId
    };
  };