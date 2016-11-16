(function() {
angular.module('taxiServiceApp', ['ngProgress', 'ui.router']);

    angular.module('taxiServiceApp').config(config);

    config.$inject = ['$stateProvider', '$locationProvider'];

    function config($stateProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');

        var states = [
           { name: 'users', url: '/users', component: 'usersComponent' },
        ];

        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    }
})();
