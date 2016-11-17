(function() {
    angular
        .module('taxiServiceApp')
        .component('updateUserModalComponent', {
             bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/users/update-user-modal.template.html',
            controller: UpdateUserModalController
        });

    UpdateUserModalController.$inject = ['usersHttpService'];

    function UpdateUserModalController(usersHttpService) {
        var self = this;
        
        self.$onInit = function() {
            self.updatedUser = {
                id: self.resolve.updatedUser.id,
                newUsername: self.resolve.updatedUser.username,
                oldUsername: self.resolve.updatedUser.username
            };
        };

        self.update = function() {
            usersHttpService.update(self.updatedUser)
                .then(function() {
                    self.close();
                }, function(response) {
                    self.errors = response.data;
                });
        };

        self.clearErrors = function() {
            delete self.errors;
        };

        self.cancel = function() {
            self.dismiss();
        };
    }
})();