(function() {
    angular
        .module('taxiServiceApp')
        .component('driversComponent', {
           templateUrl: '../templates/components/drivers/drivers.template.html',
           controller: DriversController,
        });
    
    DriversController.$inject = ['driversHttpService', 'progressBarService', '$uibModal', '$q'];

    function DriversController(driversHttpService, progressBarService, $uibModal, $q) {
        var self = this;

        self.getAll = function() {  
            progressBarService.start();

            driversHttpService.getAll()
                .then(function(response) {
                    self.drivers = response.data;
                    
                    var carsPromises = self.drivers.map(function(driver) {
                        return driversHttpService.getCarsByDriversId(driver.id);
                    });
                    
                    var ridesPromises = self.drivers.map(function(driver) {
                        return driversHttpService.getRidesByDriversId(driver.id);
                    });

                    return $q.all(carsPromises.concat(ridesPromises));
                })
                .then(function(response) {
                    for (var i = 0; i < self.drivers.length; i++) {
                        self.drivers[i].cars = response[i].data;
                        self.drivers[i].rides = response[i + self.drivers.length].data;
                    }

                    progressBarService.complete();
                });
        };

        self.addRide = function(driversId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addRideModalComponent',
                resolve: {
                    driversId: function() {
                        return driversId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.deleteRide = function(ridesId) {
            driversHttpService.deleteRide(ridesId)
                .then(function() {
                    self.getAll();
                });
        };

        self.addCar = function(driversId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addCarModalComponent',
                resolve: {
                    driversId: function() {
                        return driversId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.updateRideAsOnTheRoad = function(ridesId) {
            driversHttpService.updateRideAsOnTheRoad({ridesId: ridesId})
                .then(function() {
                    self.getAll();
                });
        };

        self.updateRideAsFinished = function(ridesId) {
            driversHttpService.updateRideAsFinished({ridesId: ridesId})
                .then(function() {
                    self.getAll();
                });
        };

        self.deleteCar = function(carsId) {
            driversHttpService.deleteCar(carsId)
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();