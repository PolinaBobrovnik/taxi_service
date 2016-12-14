(function() {
    angular
        .module('taxiServiceApp')
        .component('routesComponent', {
           templateUrl: '../templates/components/routes/routes.template.html',
           controller: RoutesController,
        });
    
    RoutesController.$inject = ['routesHttpService', 'progressBarService', '$uibModal', '$q'];

    function RoutesController(routesHttpService, progressBarService, $uibModal, $q) {
        var self = this;

        self.getAll = function() {  
            progressBarService.start();

            routesHttpService.getAll()
                .then(function(response) {
                    self.routes = response.data;

                    progressBarService.complete();
                });
        };

        self.addRoute = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addRouteModalComponent'
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };
        
        self.updateRoute = function(routesId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'updateRouteModalComponent',
                resolve: {
                    routesId: function() {
                        return routesId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.deleteRoute = function(routesId) {
            routesHttpService.deleteRoute(routesId)
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();