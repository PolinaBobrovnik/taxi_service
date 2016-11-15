(function() {
    angular
        .module('taxiServiceApp')
        .factory('constantsService', constantsService);

    function constantsService() {
        return {
            SERVER_URL: 'http://localhost:3000/api'
        };
    }
})();