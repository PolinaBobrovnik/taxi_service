(function() {
    angular
        .module('taxiServiceApp')
        .component('usersComponent', {
           templateUrl: '../templates/components/users/users.template.html',
           controller: UsersController,
        });
    
    UsersController.$inject = ['usersHttpService'];

    function UsersController(usersHttpService) {
        var self = this;

        self.getAll = function() {
            usersHttpService.getAll()
                .then(function(response) {
                    self.users = response;
                });
        };

        self.deleteById = function(id) {
            usersHttpService.deleteById(id)
                .then(function() {
                    
                });
        };

        self.getAll();
    }
})();