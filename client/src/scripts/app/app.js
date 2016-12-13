(function() {
    angular.module('taxiServiceApp', ['ngProgress', 'ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

    angular.module('taxiServiceApp').config(config);

    config.$inject = ['$stateProvider', '$locationProvider'];

    function config($stateProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');

        var states = [
            { 
                name: 'users', 
                url: '/users', 
                component: 'usersComponent' 
            },
            { 
                name: 'drivers', 
                url: '/drivers', 
                component: 'driversComponent' 
            },
            { 
                name: 'clients', 
                url: '/clients', 
                component: 'clientsComponent' 
            },
            { 
                name: 'organizations', 
                url: '/organizations', 
                component: 'organizationsComponent' 
            }
        ];

        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    }
})();
