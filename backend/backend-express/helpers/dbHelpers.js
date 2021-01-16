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
  
    const addUser = (firstName, lastName, email, password) => {
        const query = {
            text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
            values: [firstName, lastName, email, password]
        }
  
        return db.query(query)
            .then(result => result.rows[0])
            .catch(err => err);
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
        getTrips,
        getMessages,
        getUserByEmail,
        addUser
    };
  };