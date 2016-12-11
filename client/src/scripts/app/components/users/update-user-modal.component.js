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
                username: self.resolve.updatedUser.username,
                firstname: self.resolve.updatedUser.firstname,
                lastname: self.resolve.updatedUser.lastname,
                rolesId: self.resolve.updatedUser.rolesId
            };
        };

        self.updateOne = function() {
            usersHttpService.updateOne(self.updatedUser)
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