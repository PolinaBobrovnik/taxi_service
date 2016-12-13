(function() {
    angular
        .module('taxiServiceApp')
        .factory('organizationsHttpService', organizationsHttpService);
    
    organizationsHttpService.$inject = ['baseHttpService', 'constantsService'];

    function organizationsHttpService(baseHttpService, constantsService) {
        var organizationsUrl = constantsService.SERVER_URL + '/organizations/';

        return {
            getAll: function() {
                return baseHttpService.makeRequest('GET', organizationsUrl);
            },
            updateDescription: function(bodyObj) {
                return baseHttpService.makeRequest('PUT', organizationsUrl, bodyObj);
            },
            getDriversByOrganizationsId: function(organizationsId) {
                return baseHttpService.makeRequest('GET', organizationsUrl + 'drivers/' + organizationsId);
            },
            addDriver: function(bodyObj) {
                return baseHttpService.makeRequest('PUT', organizationsUrl + 'drivers/', bodyObj);
            },
            getDriversWithoutOrganization: function() {
                return baseHttpService.makeRequest('GET', organizationsUrl + 'drivers/without-organization/');
            },
            deleteDriver: function(driversId) {
                return baseHttpService.makeRequest('DELETE', organizationsUrl + 'drivers/' + driversId);
            }
        };
    }
})();