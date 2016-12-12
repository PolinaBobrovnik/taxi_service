(function() {
    angular
        .module('taxiServiceApp')
        .component('addPhoneModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/users/add-phone-modal.template.html',
            controller: AddPhoneModalController
        });
    
    AddPhoneModalController.$inject = ['usersHttpService'];

    function AddPhoneModalController(usersHttpService) {
        var self = this;

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.usersId = self.resolve.usersId;
        };

        self.addPhone = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            usersHttpService.addPhone({
                phone: self.phone,
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