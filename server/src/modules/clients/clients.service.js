var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT
            c.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM clients c
        JOIN users u
            ON u.id = c.users_id
    `;

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        }
    };
};