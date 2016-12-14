(function() {
    angular
        .module('taxiServiceApp')
        .component('updateRouteModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/routes/add-update-route-modal.template.html',
            controller: UpdateRouteModalController
        });
    
    UpdateRouteModalController.$inject = ['routesHttpService', '$q'];

    function UpdateRouteModalController(routesHttpService, $q) {
        var self = this;
        self.route = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            
            $q.all([
                routesHttpService.getRouteById(self.route.routesId),
                routesHttpService.getPoints()
            ]).then(function(response) {
                self.route.sourcesId = response[0].data.sourcesId;
                self.route.destinationsId = response[0].data.destinationsId;
                self.route.description = response[0].data.description;

                self.points = response[1].data;
            });
        };
        
        self.addOrUpdateRoute = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            routesHttpService.updateRoute(self.route).then(function() {
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