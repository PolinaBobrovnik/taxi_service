(function() {
    angular
        .module('taxiServiceApp')
        .factory('baseHttpService', baseHttpService);
    
    baseHttpService.$inject = ['$http'];
    
    function baseHttpService($http) {
        return {
            makeRequest: function(methodArg, urlArg, dataArg, headersArg) {
                var requestConfigObject = {
                    method: methodArg,
                    url: urlArg,
                    data: dataArg,
                    headers: headersArg
                };

                return $http(requestConfigObject);
            }
        };
    } 
})();