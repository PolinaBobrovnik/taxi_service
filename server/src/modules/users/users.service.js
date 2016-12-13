var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT 
            u.id AS id,
            username,
            name AS firstname,
            last_name AS lastname,
            role, 
            roles_id AS rolesId
         FROM users u
         JOIN roles r
            ON r.id = u.roles_id
    `;

    var selectOneById = selectAll + 'WHERE u.id = ?';

    var addOne = 'INSERT INTO users SET ?';

    var deleteOne = 'DELETE FROM users WHERE id = ?';

    var updateOne = 'UPDATE users SET ? WHERE id = ?';

    var selectRoles = 'SELECT * FROM roles';

    var selectPassword = 'SELECT password FROM users WHERE id = ?';

    var addEmail = 'INSERT INTO emails SET ?';

    var addPhone = 'INSERT INTO phones SET ?';

    var selectEmails = 'SELECT id, email FROM emails WHERE users_id = ?';

    var selectPhones = 'SELECT id, number FROM phones WHERE users_id = ?';

    var deleteEmail = 'DELETE FROM emails WHERE id = ?';

    var deletePhone = 'DELETE FROM phones WHERE id = ?';

    var addDriver = 'INSERT INTO drivers SET ?';

    var addClient = 'INSERT INTO clients SET ?';

    var addOrganization = 'INSERT INTO organizations SET ?';

    var addDispatcher = 'INSERT INTO dispatchers SET ?';

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        getOneById: function(id, callback) {
            connection.query(selectOneById, [id], callback);
        },
        getPassword: function(id, callback) {
            connection.query(selectPassword, [id], callback);
        },
        getRoles: function(callback) {
            connection.query(selectRoles, callback);
        },
        addOne: function(newUser, callback) {
            connection.query(addOne, [newUser], callback);
        },
        deleteOneById: function(id, callback) {
            connection.query(deleteOne, [id], callback);
        },
        updateOne: function(updatedUser, id, callback) {
            connection.query(updateOne,[updatedUser, id], callback)
        },
        addEmail: function(email, callback) {
            connection.query(addEmail,[email], callback);
        },
        addPhone: function(phone, callback) {
            connection.query(addPhone,[phone], callback);
        },
        getEmails: function(usersId, callback) {
            connection.query(selectEmails,[usersId], callback);
        },
        getPhones: function(usersId, callback) {
            connection.query(selectPhones,[usersId], callback);
        },
        deleteEmail: function(id, callback) {
            connection.query(deleteEmail, [id], callback);
        },
        deletePhone: function(id, callback) {
            connection.query(deletePhone, [id], callback);
        },
        addDriver: function(entityObj, callback) {
            connection.query(addDriver, [entityObj], callback);
        },
        addClient: function(entityObj, callback) {
            connection.query(addClient, [entityObj], callback);
        },
        addOrganization: function(entityObj, callback) {
            connection.query(addOrganization, [entityObj], callback);
        },
        addDispatcher: function(entityObj, callback) {
            connection.query(addDispatcher, [entityObj], callback);
        }
    };
};