(function() {
    angular
        .module('taxiServiceApp')
        .component('usersComponent', {
           templateUrl: '../templates/components/users/users.template.html',
           controller: UsersController,
        });
    
    UsersController.$inject = ['usersHttpService', 'progressBarService', '$uibModal', '$q'];

    function UsersController(usersHttpService, progressBarService, $uibModal, $q) {
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

                    var emailsPromises = self.users.map(function(user) {
                        return usersHttpService.getEmails(user.id);
                    });
                    
                    var phonesPromises = self.users.map(function(user) {
                        return usersHttpService.getPhones(user.id);
                    });

                    return $q.all(emailsPromises.concat(phonesPromises))
                })
                .then(function(response) {
                    for (var i = 0; i < self.users.length; i++) {
                        self.users[i].emails = response[i].data;
                        self.users[i].phones = response[i + self.users.length].data;
                    }
                   
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

        self.addEmail = function(usersId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addEmailModalComponent', 
                resolve: {
                    usersId: function() {
                        return usersId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.addPhone = function(usersId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addPhoneModalComponent', 
                resolve: {
                    usersId: function() {
                        return usersId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.deleteEmail = function(id) {
            usersHttpService.deleteEmail(id)
                .then(function() {
                    self.getAll();
                });
        };

        self.deletePhone = function(id) {
            usersHttpService.deletePhone(id)
                .then(function() {
                    self.getAll();
                });
        }

        self.getAll();
    }
})();