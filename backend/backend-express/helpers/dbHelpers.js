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

    // Add new user to DB
    const addUser = (driver, full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number) => {
        const query = {
            text: `
                INSERT INTO users (driver, full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `,
            values: [driver, full_name, email, phone_number, credit_card, license, street_address, postal_code, city, province, country, apartment_number]
        };
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
    };
  
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
        getTrips,
        getTripById,
        addTrip,
        getMessages,
        getMessageById,
        getUserByEmail
    };
  };