(function() {
    angular
        .module('taxiServiceApp')
        .component('clientsComponent', {
           templateUrl: '../templates/components/clients/clients.template.html',
           controller: ClientsController,
        });
    
    ClientsController.$inject = ['clientsHttpService', 'progressBarService', '$uibModal', '$q'];

    function ClientsController(clientsHttpService, progressBarService, $uibModal, $q) {
        var self = this;

        self.getAll = function() {  
            progressBarService.start();

            clientsHttpService.getAll()
                .then(function(response) {
                    self.clients = response.data;

                    progressBarService.complete();
                });
        };

        self.leaveComment = function(clientsId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addCommentModalComponent',
                resolve: {
                    clientsId: function() {
                        return clientsId;
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