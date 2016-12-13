(function() {
    angular
        .module('taxiServiceApp')
        .component('organizationsComponent', {
           templateUrl: '../templates/components/organizations/organizations.template.html',
           controller: OrganizationsController,
        });
    
    OrganizationsController.$inject = ['organizationsHttpService', 'progressBarService', '$uibModal', '$q'];

    function OrganizationsController(organizationsHttpService, progressBarService, $uibModal, $q) {
        var self = this;

        self.getAll = function() {  
            progressBarService.start();

            organizationsHttpService.getAll()
                .then(function(response) {
                    self.organizations = response.data;
                    
                    var driversPromises = self.organizations.map(function(organization) {
                        return organizationsHttpService.getDriversByOrganizationsId(organization.id);
                    });
                    
                    return $q.all(driversPromises);
                   
                })
                .then(function(response) {
                    for(var i = 0; i < self.organizations.length; i++) {
                        self.organizations[i].drivers = response[i].data;
                    }

                    progressBarService.complete();
                });
        };

        self.addDriver = function(organizationsId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addDriverModalComponent',
                resolve: {
                    organizationsId: function() {
                        return organizationsId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.deleteDriver = function(driversId) {
            organizationsHttpService.deleteDriver(driversId)
                .then(function() {
                    self.getAll();
                });
        };

        self.updateDescription = function(description, organizationsId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'updateDescriptionModalComponent',
                resolve: {
                    organizationsId: function() {
                        return organizationsId;
                    },
                    description: function() {
                        return description;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();