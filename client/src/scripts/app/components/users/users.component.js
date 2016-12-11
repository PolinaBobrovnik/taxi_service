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

        self.addOne = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addUserModalComponent'
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
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

        self.deleteOneById = function(id) {
            progressBarService.start();

            usersHttpService.deleteOneById(id)
                .then(function() {
                    var index = self.users.map(function(user) { return user.id; }).indexOf(id);

                    self.users.splice(index, 1);
                    progressBarService.complete();
                });
        };

        self.updateOne = function(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'updateUserModalComponent', 
                resolve: {
                    updatedUser: function() {
                        return user;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();