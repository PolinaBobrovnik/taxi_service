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
            updateDescription: function(descriptionObj) {
                return baseHttpService.makeRequest('PUT', organizationsUrl, descriptionObj);
            }  
        };
    }
})();