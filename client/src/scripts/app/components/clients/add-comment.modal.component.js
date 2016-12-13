(function() {
    angular
        .module('taxiServiceApp')
        .component('addCommentModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/clients/add-comment-modal.template.html',
            controller: AddCommentModalController
        });
    
    AddCommentModalController.$inject = ['clientsHttpService'];

    function AddCommentModalController(clientsHttpService) {
        var self = this;
        self.car = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();