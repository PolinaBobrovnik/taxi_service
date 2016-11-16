(function() {
    angular
        .module('taxiServiceApp')
        .component('usersComponent', {
           templateUrl: '../templates/components/users/users.template.html',
           controller: UsersController,
        });
    
    UsersController.$inject = ['usersHttpService', 'progressBarService', '$uibModal'];

    function UsersController(usersHttpService, progressBarService, $uibModal) {
        var self = this;

        self.add = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addUserModalComponent'
            });

            modalInstance.result
                .then(function(newUser) {
                    self.users.push(newUser);
                });
        };

        self.getAll = function() {  
            progressBarService.start();

            usersHttpService.getAll()
                .then(function(response) {
                    self.users = response.data;
                    progressBarService.complete();
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