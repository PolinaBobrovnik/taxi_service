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

                    return $q.all(carsPromises)
                })
                .then(function(response) {
                    for (var i = 0; i < self.drivers.length; i++) {
                        self.drivers[i].cars = response[i].data;
                    }

                    progressBarService.complete();
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

        self.deleteCar = function(carsId) {
            driversHttpService.deleteCar(carsId)
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();