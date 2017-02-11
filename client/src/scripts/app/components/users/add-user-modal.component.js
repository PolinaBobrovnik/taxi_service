(function() {
    angular
        .module('taxiServiceApp')
        .component('addUserModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&'
            },
            templateUrl: '../templates/components/users/add-user-modal.template.html',
            controller: AddUserModalController
        });
    
    AddUserModalController.$inject = ['usersHttpService'];

    function AddUserModalController(usersHttpService) {
        var self = this;
        self.newUser = {};

        self.$onInit = function() {
            usersHttpService.getRoles()
                .then(function(response) {
                    self.roles = response.data;
                });
        };

        self.clearErrors = function() {
            delete self.errors;
        };

        self.addOne = function($event) {
            $event.preventDefault();

            self.clearErrors();

            usersHttpService.addOne(self.newUser)
                .then(function() {
                    self.close();
                }, function(response) {
                    self.errors = response.data;
                });       
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();