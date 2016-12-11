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
        }
    }
};