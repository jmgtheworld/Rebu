const express = require('express');
const router = express.Router();

module.exports = ({
    getMessages
}) => {
    /* GET all trips */
    router.get('/', (req, res) => {
        getMessages()
            .then((messages) => res.json(messages))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    return router;
};