(function() {
    angular
        .module('taxiServiceApp')
        .component('driversComponent', {
           templateUrl: '../templates/components/drivers/drivers.template.html',
           controller: DriversController,
        });
    
    DriversController.$inject = ['driversHttpService', 'progressBarService', '$uibModal', '$q'];

    function DriversController(driversHttpService, progressBarService, $uibModal, $q) {
        var self = this;

        self.getAll = function() {  
            progressBarService.start();

            driversHttpService.getAll()
                .then(function(response) {
                    self.drivers = response.data;
                    progressBarService.complete();

                    // var emailsPromises = self.users.map(function(user) {
                    //     return usersHttpService.getEmails(user.id);
                    // });
                    
                    // var phonesPromises = self.users.map(function(user) {
                    //     return usersHttpService.getPhones(user.id);
                    // });

                    // return $q.all(emailsPromises.concat(phonesPromises))
                });
                // .then(function(response) {
                //     for (var i = 0; i < self.users.length; i++) {
                //         self.users[i].emails = response[i].data;
                //         self.users[i].phones = response[i + self.users.length].data;
                //     }
                   
                //     progressBarService.complete();
                // });
        };

        self.addCar = function(driversId) {
            var modalInstance = $uibModal.open({
                animation: true,
                component: 'addCarModalComponent',
                resolve: {
                    driversId: function() {
                        return driversId;
                    }
                }
            });

            modalInstance.result
                .then(function() {
                    self.getAll();
                });
        };

        self.getAll();
    }
})();