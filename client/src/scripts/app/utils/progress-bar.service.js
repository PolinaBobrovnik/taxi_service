(function() {
    angular
        .module('taxiServiceApp')
        .factory('progressBarService', progressBarService);

        progressBarService.$inject = ['ngProgressFactory'];

        function progressBarService(ngProgressFactory) {
            var progressBar = ngProgressFactory.createInstance();

            progressBar.setHeight('7px');
            progressBar.setColor('#ecf0f1');

            return {
                start: function() {
                    progressBar.start();
                },
                complete: function() {
                    progressBar.complete();
                }
            };
        }
})();