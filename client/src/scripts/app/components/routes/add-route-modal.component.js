(function() {
    angular
        .module('taxiServiceApp')
        .component('addRouteModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&'
            },
            templateUrl: '../templates/components/routes/add-update-route-modal.template.html',
            controller: AddRouteModalController
        });
    
    AddRouteModalController.$inject = ['routesHttpService'];

    function AddRouteModalController(routesHttpService) {
        var self = this;
    
        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            routesHttpService.getPoints()
                .then(function(response) {
                    self.points = response.data;
                });
        };
        
        self.addOrUpdateRoute = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            routesHttpService.addRoute(self.route).then(function() {
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