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
    
    AddCommentModalController.$inject = ['clientsHttpService', '$q'];

    function AddCommentModalController(clientsHttpService, $q) {
        var self = this;
        self.comment = {};

        self.clearErrors = function() {
            delete self.errors;
        };

        self.$onInit = function() {
            self.comment.clientsId = self.resolve.clientsId;

            $q.all([
                clientsHttpService.getRatings(),
                clientsHttpService.getOrganizations()
            ]).then(function(response) {
                self.ratings = response[0].data;
                self.organizations = response[1].data;
            });
        };

        self.leaveComment = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            clientsHttpService.leaveComment(self.comment)
                .then(function() {
                    self.close();
                }, function(response) {
                    self.errors = response.data;
                });
        };

        self.getDriversByOrganizationsId = function() {
            clientsHttpService.getDriversByOrganizationsId(self.comment.organizationsId)
                .then(function(response) {
                    self.drivers = response.data;
                });
        };

        self.cancel = function() {
            self.dismiss();
        };
    } 
})();