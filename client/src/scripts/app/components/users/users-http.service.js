(function() {
    angular
        .module('taxiServiceApp')
        .factory('usersHttpService', usersHttpService);
    
    usersHttpService.$inject = ['baseHttpService', 'constantsService'];

    function usersHttpService(baseHttpService, constantsService) {
        var usersUrl = constantsService.SERVER_URL + '/users/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', usersUrl)
                    .then(function(response) {
                        return response.data;
                    });
            },
            deleteByid: function(id) {
                return baseHttpService.makeRequest('DELETE', usersUrl + id);
            }
        };
    }
})();