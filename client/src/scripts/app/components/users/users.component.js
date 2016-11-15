(function() {
    angular
        .module('taxiServiceApp')
        .component('usersComponent', {
            templateUrl: '../templates/components/users/users.template.html',
            controller: ['usersHttpService', function(usersHttpService) {
                 var self = this;

                usersHttpService.getAll()
                    .then(function(data) {
                        self.users = data;
                    });
            }]
        });
    
    // UsersController.$inject = ['usersHttpService'];

    // function UsersController(usersHttpService) {
    //     var self = this;

    //     usersHttpService.getAll()
    //         .then(function(data) {
    //             self.users = data;
    //         });
    // }
})();