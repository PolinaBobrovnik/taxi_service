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

    var insertComment = 'INSERT INTO comments SET ?';

    var selectRatings = 'SELECT id, rating FROM ratings';

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        leaveComment: function(entityObj, callback) {
            connection.query(insertComment, [entityObj], callback);
        },
        getRatings: function(callback) {
            connection.query(selectRatings, callback);
        }
    };
};