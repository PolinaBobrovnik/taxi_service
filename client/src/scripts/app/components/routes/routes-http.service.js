(function() {
    angular
        .module('taxiServiceApp')
        .factory('routesHttpService', routesHttpService);
    
    routesHttpService.$inject = ['baseHttpService', 'constantsService'];

    function routesHttpService(baseHttpService, constantsService) {
        var routesUrl = constantsService.SERVER_URL + '/routes/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', routesUrl);
            },
            getPoints: function() {
                return baseHttpService.makeRequest('GET', routesUrl + 'points/');
            },
            addRoute: function(bodyObj) {
                return baseHttpService.makeRequest('POST', routesUrl, bodyObj);
            },
            deleteRoute: function(routesId) {
                return baseHttpService.makeRequest('DELETE', routesUrl + routesId);
            },
            updateRoute: function(bodyObj) {
                return baseHttpService.makeRequest('PUT', routesUrl, bodyObj);
            },
            getRouteById: function(routesId) {
                return baseHttpService.makeRequest('GET', routesUrl + routesId);
            }
        };
    }
})();