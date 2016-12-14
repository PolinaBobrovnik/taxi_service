(function() {
    angular
        .module('taxiServiceApp')
        .component('commentsDetailsModalComponent', {
            bindings: {
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/organizations/comments-details-modal.template.html',
            controller: CommentsDetailsController
        });
    
    CommentsDetailsController.$inject = ['organizationsHttpService'];

    function CommentsDetailsController(organizationsHttpService) {
        var self = this;

        self.$onInit = function() {
            self.comment = self.resolve.comment       
        };
        
        self.cancel = function() {
            self.dismiss();
        };
    } 
})();