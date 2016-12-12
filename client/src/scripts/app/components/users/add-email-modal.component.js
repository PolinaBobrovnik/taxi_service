(function() {
    angular
        .module('taxiServiceApp')
        .component('addEmailModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/users/add-email-modal.template.html',
            controller: AddEmailModalController
        });
    
    AddEmailModalController.$inject = ['usersHttpService'];

    function AddEmailModalController(usersHttpService) {
        var self = this;

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.usersId = self.resolve.usersId;
        };

        self.addEmail = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            usersHttpService.addEmail({
                email: self.email,
                usersId: self.usersId
            }).then(function() {
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