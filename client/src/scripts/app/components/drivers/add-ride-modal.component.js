(function() {
    angular
        .module('taxiServiceApp')
        .component('addRideModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/drivers/add-ride-modal.template.html',
            controller: AddRideModalController
        });
    
    AddRideModalController.$inject = ['driversHttpService', 'routesHttpService', '$q'];

    function AddRideModalController(driversHttpService, routesHttpService, $q) {
        var self = this;
        self.ride = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.ride.driversId = self.resolve.driversId;

            $q.all([
                driversHttpService.getCarsByDriversId(self.ride.driversId),
                routesHttpService.getAll()
            ]).then(function(response) {
                self.cars = response[0].data;
                self.routes = response[1].data;
            });
        };

    
        self.addRide = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            driversHttpService.addRide(self.ride)
                .then(function() {
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