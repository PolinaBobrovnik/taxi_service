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

        self.clearErrors = function() {
            delete self.errors;
        };

        self.add = function($event) {
            $event.preventDefault();

            self.clearErrors();

            usersHttpService.add(self.newUser)
                .then(function(response) {
                    self.newUser.id = response.data.newUserId;

                    self.close({$value: self.newUser});
                }, function(response) {
                    self.errors = response.data;
                });       
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();