(function() {
    angular
        .module('taxiServiceApp')
        .component('addTicketModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/clients/add-ticket-modal.template.html',
            controller: AddTicketModalController
        });
    
    AddTicketModalController.$inject = ['clientsHttpService','driversHttpService', '$q'];

    function AddTicketModalController(clientsHttpService, driversHttpService, $q) {
        var self = this;
        self.ticket = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.ticket.clientsId = self.resolve.clientsId;

            $q.all([
                clientsHttpService.getPaymentTypes(),
                driversHttpService.getAvailableRides()
            ]).then(function(response) {
                self.paymentTypes = response[0].data;
                self.rides = response[1].data;
            });
        };

        self.bookTicket = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            clientsHttpService.bookTicket(self.ticket)
                .then(function() {
                    self.close();
                }, function(response) {
                    self.errors = response.data;
                })
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();