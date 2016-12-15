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
                return baseHttpService.makeRequest('POST', driversUrl + 'cars/', car);
            },
            getCarsBrands: function() {
                return baseHttpService.makeRequest('GET', driversUrl + 'cars/brands/');
            },
            getCarsModels: function(brandsId) {
                return baseHttpService.makeRequest('GET', driversUrl + 'cars/models/' + brandsId);
            },
            getCarsByDriversId: function(driversId) {
                return baseHttpService.makeRequest('GET', driversUrl + 'cars/' + driversId);
            },
            deleteCar: function(carsId) {
                return baseHttpService.makeRequest('DELETE', driversUrl + 'cars/' + carsId);
            },
            addRide: function(ride) {
                return baseHttpService.makeRequest('POST', driversUrl + 'rides/', ride);
            },
            getRidesByDriversId: function(driversId) {
                return baseHttpService.makeRequest('GET', driversUrl + 'rides/' + driversId);
            },
            getAvailableRides: function() {
                return baseHttpService.makeRequest('GET', driversUrl + 'rides/available/');
            },
            deleteRide: function(ridesId){
                return baseHttpService.makeRequest('DELETE', driversUrl + 'rides/' + ridesId);
            },
            updateRideAsOnTheRoad: function(bodyObj) {
                return baseHttpService.makeRequest('PUT', driversUrl + 'rides/on-the-road/', bodyObj);
            },
            updateRideAsFinished: function(bodyObj) {
                return baseHttpService.makeRequest('PUT', driversUrl + 'rides/finished/', bodyObj);
            }
        };
    }
})();