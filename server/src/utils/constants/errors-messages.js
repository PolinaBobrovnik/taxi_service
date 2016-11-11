module.exports = {
    validationErrors: {
        users: {
            INVALID_PASSWORD: 'Invalid password! Should be between 8 and 20 chars and contain at least 1 and more upper-case letter and number.',
            INVALID_USERNAME: 'Invalid username! Should be between 3 and 20 chars.',
            BUSY_USERNAME: 'This username is busy! Try other one.',
            NOT_SAME_PASSWORDS: 'New password and confirm password fields have not same values! Retype them.',
            INVALID_OLD_PASSWORD: 'Invalid old password! Retype it.'
        }
    },
    otherErrors: {
        INTERNAL_SERVER_ERROR: 'Something bad happened!'
    }
};
