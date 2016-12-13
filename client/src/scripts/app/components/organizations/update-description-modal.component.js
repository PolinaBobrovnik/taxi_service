(function() {
    angular
        .module('taxiServiceApp')
        .component('updateDescriptionModalComponent', {
            bindings: {
                close: '&',
                dismiss: '&',
                resolve: '<'
            },
            templateUrl: '../templates/components/organizations/update-description-modal.template.html',
            controller: updateDescriptionModalController
        });
    
    updateDescriptionModalController.$inject = ['organizationsHttpService'];

    function updateDescriptionModalController(organizationsHttpService) {
        var self = this;
        self.descriptionsObj = {};

        self.$onInit = function() {
            self.descriptionsObj.organizationsId = self.resolve.organizationsId;
            self.descriptionsObj.description = self.resolve.description;
        };
        
        self.clearErrors = function() {
            delete self.errors;
        };

        self.updateDescription = function($event) {
            $event.preventDefault();

            self.clearErrors();
            
            organizationsHttpService.updateDescription(self.descriptionsObj)
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