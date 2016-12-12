(function() {
    angular
        .module('taxiServiceApp')
        .factory('driversHttpService', driversHttpService);
    
    driversHttpService.$inject = ['baseHttpService', 'constantsService'];

    function driversHttpService(baseHttpService, constantsService) {
        var driversUrl = constantsService.SERVER_URL + '/drivers/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', driversUrl);
            },
            addCar: function(car) {
                return baseHttpService.makeRequest('POST', driversUrl + '/cars/', car);
            },
            getCarsBrands: function() {
                return baseHttpService.makeRequest('GET', driversUrl + '/cars/brands/');
            },
            getCarsModels: function(brandsId) {
                return baseHttpService.makeRequest('GET', driversUrl + '/cars/models/' + brandsId);
            }
        };
    }
})();