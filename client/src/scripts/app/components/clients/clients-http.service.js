(function() {
    angular
        .module('taxiServiceApp')
        .factory('clientsHttpService', clientsHttpService);
    
    clientsHttpService.$inject = ['baseHttpService', 'constantsService'];

    function clientsHttpService(baseHttpService, constantsService) {
        var clientsUrl = constantsService.SERVER_URL + '/clients/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', clientsUrl);
            },   
        };
    }
})();