var connection = require('../../utils/mysql-connection');

module.exports = {
    getAll: function(callback) {
        connection.query('SELECT * FROM `users`', callback);
    },
    getById: function(id, callback) {
        connection.query('SELECT * FROM `users` WHERE `id` = ?', [id], callback);
    },
    getByUsername: function(username, callback) {
        connection.query('SELECT * FROM `users` WHERE `username` = ?', [username], callback);
    },
    add: function(newUser, callback) {
        connection.query('INSERT INTO `users` SET ?', [newUser], callback);
    },
    deleteById: function(id, callback) {
        connection.query('DELETE FROM `users` WHERE `id` = ? ', [id], callback);
    },
    update: function(updatedUser, id, callback) {
        connection.query('UPDATE `users` SET ? WHERE `id` = ?',[updatedUser, id], callback)
    }
}