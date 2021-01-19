module.exports = (db) => {
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
        getMessages,
        getMessageById
    };
  };