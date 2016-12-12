module.exports =  function() {
    var INVALID_USERNAME = 'Invalid username! Should be 3-20 chars.';

    var INVALID_PASSWORD = 'Invalid password! Should be 8-20 chars and contain at least 1 or more upper-case letters and numbers.';

    var NOT_SAME_PASSWORDS = 'New password and confirm password fields have not same values! Retype them.';

    var INVALID_PART_OF_NAME = 'Invalid part of full name! Should be 2-45 characters.';

    var NO_ROLE = 'Role has not chosen!';

    var INVALID_EMAIL = 'Invalid email! Should be no more 45 chars.'

    var INVALID_PHONE = 'Invalid phone! Should be numeric and have 7-13 length.';

    var USERNAME_REGEX = '^[a-zA-Z0-9]{3,20}$';

    var PASSWORD_REGEX = '^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$';

    var PART_OF_NAME_REGEX = '^[a-zA-Zа-яА-ЯёЁ]{2,45}$';

    var PHONE_REGEX = '^[0-9]{7,13}$';

    return {
        validateUsersData: function(req) {
            req.checkBody('rolesId', NO_ROLE).notEmpty();

            req.checkBody('username', INVALID_USERNAME).matches(USERNAME_REGEX);

            req.checkBody('password', INVALID_PASSWORD).matches(PASSWORD_REGEX);

            req.checkBody('confirmPassword', NOT_SAME_PASSWORDS).equals(req.body.password);

            req.checkBody('firstname', INVALID_PART_OF_NAME).matches(PART_OF_NAME_REGEX);

            if (req.body.lastname) {
                req.checkBody('lastname', INVALID_PART_OF_NAME).matches(PART_OF_NAME_REGEX);
            }

            return req.validationErrors();
        },
        validateEmail: function(req) {
            req.checkBody('email', INVALID_EMAIL).isEmail().isLength({max: 45});

            return req.validationErrors();
        },
        validatePhoneNumber: function(req){
            req.checkBody('phone', INVALID_PHONE).matches(PHONE_REGEX);

            return req.validationErrors();
        }
    };
};