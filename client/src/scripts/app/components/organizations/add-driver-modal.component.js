(function() {
    angular
        .module('taxiServiceApp')
        .component('addDriverModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/organizations/add-driver-modal.template.html',
            controller: AddDriverModalController
        });
    
    AddDriverModalController.$inject = ['organizationsHttpService'];

    function AddDriverModalController(organizationsHttpService) {
        var self = this;
        self.descriptionsObj = {};

        self.$onInit = function() {
            self.organizationsId = self.resolve.organizationsId;

            organizationsHttpService.getDriversWithoutOrganization()
                .then(function(response) {
                    self.drivers = response.data;
                });
        };
        
        self.clearErrors = function() {
            delete self.errors;
        };

        self.addDriver = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            organizationsHttpService.addDriver({
                organizationsId: self.organizationsId,
                driversId: self.driversId
            }).then(function() {
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