module.exports = {
    validationErrors: {
        users: {
            INVALID_PASSWORD: 'Invalid password! Should be between 8 and 20 chars and contain at least 1 and more upper-case letter and number.',
            INVALID_USERNAME: 'Invalid username! Should be between 6 and 20 chars.',
            BUSY_USERNAME: 'This username is busy! Try other one.'
        }
    },
    otherErrors: {
        INTERNAL_SERVER_ERROR: 'Something bad happened!'
    }
};
