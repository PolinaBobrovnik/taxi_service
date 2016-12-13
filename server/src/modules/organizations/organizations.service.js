var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT
           o.id,
           u.name AS organizationsName,
           o.description
        FROM organizations o
        JOIN users u
            ON u.id = o.users_id     
    `;

    var updateDescription = 'UPDATE organizations SET description = ? WHERE id = ?';

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        updateDescription: function(description, id,  callback) {
            connection.query(updateDescription, [description, id], callback);
        }
    }
};