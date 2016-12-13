(function() {
    angular
        .module('taxiServiceApp')
        .component('addCarModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/drivers/add-car-modal.template.html',
            controller: AddCarModalController
        });
    
    AddCarModalController.$inject = ['driversHttpService'];

    function AddCarModalController(driversHttpService) {
        var self = this;
        self.car = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.car.driversId = self.resolve.driversId;

            driversHttpService.getCarsBrands()
                .then(function(response) {
                    self.carsBrands = response.data;
                });
        };

        self.getCarsModels = function() {
            driversHttpService.getCarsModels(self.car.carsBrandsId)
                .then(function(response) {
                    self.carsModels = response.data;
                });
        };
        
        self.addCar = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            driversHttpService.addCar(self.car).then(function() {
                self.close();
            }, function(response) {
                self.errors = response.data;
            });
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();