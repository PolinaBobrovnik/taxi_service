(function() {
    angular
        .module('taxiServiceApp')
        .factory('usersHttpService', usersHttpService);
    
    usersHttpService.$inject = ['baseHttpService', 'constantsService'];

    function usersHttpService(baseHttpService, constantsService) {
        var usersUrl = constantsService.SERVER_URL + '/users/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', usersUrl);
            },
            getRoles: function() {
                return baseHttpService.makeRequest('GET', usersUrl + '/roles/');
            },
            deleteOneById: function(id) {
                return baseHttpService.makeRequest('DELETE', usersUrl + id);
            },
            updateOne: function(updatedUser) {
                return baseHttpService.makeRequest('PUT', usersUrl, updatedUser);    
            },
            addOne: function(newUser) {
                return baseHttpService.makeRequest('POST', usersUrl, newUser);
            },
        };
    }
})();