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

                    progressBarService.complete();
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