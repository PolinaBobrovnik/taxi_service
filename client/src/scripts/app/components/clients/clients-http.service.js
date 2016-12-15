(function() {
    angular
        .module('taxiServiceApp')
        .factory('clientsHttpService', clientsHttpService);
    
    clientsHttpService.$inject = ['baseHttpService', 'constantsService'];

    function clientsHttpService(baseHttpService, constantsService) {
        var clientsUrl = constantsService.SERVER_URL + '/clients/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', clientsUrl);
            },
            leaveComment: function(bodyObj) {
                return baseHttpService.makeRequest('POST', clientsUrl + 'comment/', bodyObj);
            },
            getRatings: function() {
                return baseHttpService.makeRequest('GET', clientsUrl + 'ratings/');
            },
            getOrganizations: function() {
                 return baseHttpService.makeRequest('GET', clientsUrl + 'organizations/');
            },
            getDriversByOrganizationsId: function(organizationsId) {
                return baseHttpService.makeRequest('GET', clientsUrl + 'drivers/' + organizationsId);
            },
            bookTicket: function(bodyObj) {
                return baseHttpService.makeRequest('POST', clientsUrl + 'ticket/', bodyObj);
            },
            getTicketsByClientsId: function(clientsId) {
                return baseHttpService.makeRequest('GET', clientsUrl + 'ticket/' + clientsId);
            },
            deleteTicket: function(clientsId, ridesId) {
                return baseHttpService.makeRequest('DELETE', clientsUrl + 'ticket/' + clientsId + '/' + ridesId);
            },
            getPaymentTypes: function() {
                return baseHttpService.makeRequest('GET', clientsUrl + 'ticket/payment-types/');
            }
        };
    }
})();