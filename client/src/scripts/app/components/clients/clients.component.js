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
                    
                    return $q.all(self.clients.map(function(client) {
                        return clientsHttpService.getTicketsByClientsId(client.id);
                    }));
                }).then(function(response) {
                    for (var i = 0; i < self.clients.length; i++) {
                        self.clients[i].tickets = response[i].data;
                    }

                    progressBarService.complete();
                });
        };

        self.deleteTicket = function(ticketsId, ridesId) {
            clientsHttpService.deleteTicket(ticketsId, ridesId)
                .then(function() {
                    self.getAll();
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
        
        self.bookTicket = function(clientsId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addTicketModalComponent',
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